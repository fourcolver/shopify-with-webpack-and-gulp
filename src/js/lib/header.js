/**
* Header JS
*/
SDG.Header = (function() {

	const c = {

		// Event classes
		cls: {
			active: 'is-active',
			sticky: 'is-sticky',
			showing: 'is-showing'
		},

		// Dom IDs and classes for selecting elements
		dom: {
			// Site header
			hdr: 'hdr',
			hdr_btn: 'js-nav-menu',
			// Mobile Nav
			navm: 'navm',
			navm_btn: 'js-navm-btn',
			navm_modal: 'navmMenuModal',
			navm_overlay: 'navmMenuOverlay',
			navm_menu_btn: 'js-navm-menu-btn',
			navm_menu_anchor: 'js-navm-menu-anchor'
		}
	};

	/**
	* dom nodes
	*/
	const $hdr = document.getElementById(c.dom.hdr);
	const $navm = document.getElementById(c.dom.navm);
	let $activeNavmMenu;
	let $activeNavMenu;

	/**
	* variables
	*/
	let modalOpen = false;
	const modalOpts = {
		cb: {
			before_close: closeCb
		},
		dom: {
			modal_id: c.dom.navm_modal,
			overlay: c.dom.navm_overlay,
			trigger: null
		}
	};
	const modal = SDG.Modal.init(modalOpts);

	/**
	* init
	* @return {[type]} [inits all scripts required by the header on load.]
	*/
	function init() {
		responsive();
		_.windowResize(responsive);

	}

	function responsive() {
		_.mq({
			view: 'desktop',
			callback: () => {
				desktopNav();
			}
		});
		_.mq({
			view: 'mobile',
			callback: () => {
				mobileNav();
			}
		});
	}

	/**
	* desktopNav
	* @return {Function} [inits all scripts required by the desktop view of the header]
	*/
	function desktopNav() {

		_.waypoint({
			el: $hdr,
			in: setStickyHdr,
			out: unsetStickyHdr
		});

		_.addEvent({
			id: c.dom.hdr,
			className: c.dom.hdr_btn,
			event: 'mouseenter',
			fn: showDesktopNav
		});

		_.addEvent({
			id: c.dom.hdr,
			className: c.dom.hdr_btn,
			event: 'mouseleave',
			fn: closeDesktopMenu
		});
	}

	/**
	* setStickyHdr
	* @returns {Function} [adds sticky header class to the page header]
	*/
	function setStickyHdr() {
		_.addClass($hdr, c.cls.sticky);
	}

	/**
	* unsetStickyHdr
	* @returns {Function} [removes sticky header class from the page headers]
	*/
	function unsetStickyHdr() {
		_.removeClass($hdr, c.cls.sticky);
	}


	/**
	* mobileNav
	* @return {Function} [in its all scripts required by the mobile view of the header]
	*/
	function mobileNav() {
		modal.init();

		_.addEvent({
			id: c.dom.navm,
			className: c.dom.navm_btn,
			event: 'click',
			fn: showMobileNav
		});

		_.addEvent({
			id: c.dom.navm,
			className: c.dom.navm_menu_anchor,
			event: 'click',
			fn: checkForHash
		});

		_.addEvent({
			id: c.dom.navm_modal,
			className: c.dom.navm_menu_anchor,
			event: 'click',
			fn: checkForHash
		});
	}

	function showDesktopNav() {

		const isActive = _.hasClass(this, c.cls.active);
		const menu = this.getAttribute('data-menu');

		if (isActive) {
			// modal.close();
		} else {
			// clear all current active menus
			clearActiveMenus();

			// set active menu
			$activeNavMenu = document.querySelector(`[data-target=${menu}]`);

			// set clicked element to active
			_.addClass(this, c.cls.active);

			// set active menu to visible
			if ($activeNavMenu) {
				_.addClass($activeNavMenu, c.cls.showing);
			}

		}
	}

	function showMobileNav(e) {
		const isActive = _.hasClass(this, c.cls.active);
		const menu = this.getAttribute('data-menu');

		if (isActive) {
			modal.close();
		} else {
			// clear all current active menus
			clearActiveMenus();

			// set active menu
			$activeNavmMenu = document.getElementById(menu);

			// if the modal is not open, then open the modal
			if (!modalOpen) {
				modal.open(e);
				modalOpen = true;
			}

			// set clicked element to active
			_.addClass(this, c.cls.active);

			// set active menu to visible
			if ($activeNavmMenu) {
				_.addClass($activeNavmMenu, c.cls.showing);
			}

		}
	}

	/**
	* clear active menu
	* @type {Function}
	*/
	function clearActiveMenus() {
		const $activeBtns = $navm.querySelectorAll(`.${c.cls.active}`);
		let $activeBtn;
		let i;

		// check if there were any active buttons
		if ($activeBtns.length > 0) {

			// loop through active buttons array
			for (i = 0; i < $activeBtns.length; i += 1) {
				$activeBtn = $activeBtns[i];

				// remove active nav button
				_.removeClass($activeBtn, c.cls.active);
			}

			// hide active nav menu
			if ($activeNavmMenu) {
				_.removeClass($activeNavmMenu, c.cls.showing);
			}
		}
		$activeNavmMenu = null;
	}

	/**
	* clear active menu
	* @type {Function}
	*/
	function closeDesktopMenu() {
		const $activeMenus = $hdr.querySelectorAll(`.${c.cls.active}`);
		let $active;
		let i;

		// loop through active buttons array
		for (i = 0; i < $activeMenus.length; i += 1) {
			$active = $activeMenus[i];

			// remove active nav button
			_.removeClass($active, c.cls.active);
		}

		// hide active nav menu
		if ($activeNavMenu) {
			_.removeClass($activeNavMenu, c.cls.showing);
		}

		$activeNavMenu = null;
	}

	/**
	* close all menus
	*/
	function closeAllMenus() {
		clearActiveMenus();
		modal.close();
	}


	function checkForHash() {
		const url = this.getAttribute('href');
		const urlContainsHash = url.indexOf('#') !== -1;

		// if url contains hash, close menu
		if (urlContainsHash) {
			closeAllMenus();
		}
	}

	function closeCb() {
		clearActiveMenus();
		modalOpen = false;
	}

	return {
		init: () => init(),
	};
}());
