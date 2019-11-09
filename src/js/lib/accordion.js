/**
 * Accordion
 * @param  {obj}  Config object
 * @requires [lib/util.js]
 */
SDG.accordion = function(opts) {
	const config = {
		cb: {
			open: null, // Callback on Open
			close: null // Call back on Close
		},
		cls: {
			active: 'is-active', // Button active class
			open: 'is-open'
		},
		dom: {
			btn: 'js-acc-btn', // toggle trigger
			id: 'acc', // id of the accordion
			menu: 'js-acc-menu' // class to target the menu
		},
		enable_linking: false,
		open_option: null, // {number}
		responsive: false, // Use responsive?
		scroll: {
			use: false, // Use scroll
			scope: 'html,body', // Scroll scope
			offset_by: 60 // Integer
		},
		type: 'accordion', // 'accordin' or 'toggle'
		views: {
			active: null, // {array}
			inactive: null, // {array}
			current: null // {string}
		},
		close_on_trigger_click: true // close menu on trigger click?
	};

	const c = _.extend(config, opts); // Extend defaults with passed options

	const $accordion = document.getElementById(c.dom.id); // Object that all functions are bound to.

	let isSub;

	/**
	 * Init
	 * @type {Function}
	 */
	function init() {
		if (c.responsive) {
			responsive();
			_.windowResize(responsive);

		} else {
			bindEvents();
		}

		// check url
		if (c.enable_linking) {
			addHashChangeEvent();
			openMenuByUrl();
		}

		// open option
		if (c.open_option !== null) {
			openOption(c.open_option);
		}

		callbacks();
	}

	/**
	 * add hash change event
	 */
	function addHashChangeEvent() {
		window.addEventListener('hashchange', openMenuByUrl, false);
	}

	/**
	 * bindEvents
	 * @type {Function}
	 * @param {el} Element to bind events to
	 */
	function bindEvents() {
		if ($accordion) {
			_.addEvent({
				id: c.dom.id,
				className: c.dom.btn,
				event: 'click',
				fn: checkState
			});

			// _.windowResize(resetActive);
		}
	}

	/**
	 * unbindEvents
	 * @type {Function}
	 * @param {el} Element to bind events to
	 */
	function unbindEvents() {
		_.removeEvent({
			id: c.dom.id,
			className: c.dom.btn,
			event: 'click',
			fn: checkState
		});
	}

	/**
	 * checkActive
	 * @type {Function}
	 */
	function checkState() {
		const isActive = _.hasClass(this, c.cls.active);
		const $menu = this.nextElementSibling;
		const $parentMenu = _.parents(this, `.${c.dom.menu}`);

		if ($parentMenu) {
			isSub = true;
		} else {
			isSub = false;
		}

		if (isActive && c.close_on_trigger_click) {
			closeMenu($menu);
			_.removeClass(this, c.cls.active);
		} else {
			openMenu($menu);
			_.addClass(this, c.cls.active);
		}
	}

	/**
	 * closeMenu
	 * @type {Function}
	 * @param {el} - Menu to close
	 */
	function closeMenu(el) {
		const currentHeight = el.offsetHeight;
		const $activeBtns = el.querySelectorAll(`.${c.cls.active}`);
		let $activeBtn;
		let $activeMenu;

		el.style.height = `${currentHeight}px`;

		_.slideUp(el);

		if ($activeBtns.length > 0) {
			Object.keys($activeBtns).forEach((key) => {
				$activeBtn = $activeBtns[key];
				$activeMenu = $activeBtn.nextElementSibling;
				_.removeClass($activeBtn, c.cls.active);
				_.removeClass($activeMenu, c.cls.open);
				_.slideUp($activeMenu);
			});
		}

		_.trigger($accordion, 'closeCb');
	}

	/**
	 * openMenu
	 * @param {el} - Menu to open
	 */
	function openMenu(el) {
		let $activeBtn;
		let $activeBtns;
		let $activeMenu;
		let $parentMenu;

		if (c.type === 'accordion') {

			if (isSub) {
				$parentMenu = _.parents(el, `.${c.cls.open}`);
				Object.keys($parentMenu).forEach((key) => {
					if ($parentMenu[key] && $parentMenu[key] !== el) {
						$parentMenu = $parentMenu[key];
					}
				});
				$activeBtns = $parentMenu.querySelectorAll(`.${c.dom.btn}.${c.cls.active}`);
			} else {
				$activeBtns = $accordion.querySelectorAll(`.${c.cls.active}`);
			}

			if ($activeBtns.length > 0) {
				Object.keys($activeBtns).forEach((key) => {
					$activeBtn = $activeBtns[key];
					$activeMenu = $activeBtn.nextElementSibling;
					closeMenu($activeMenu);
					_.removeClass($activeBtn, c.cls.active);
					_.removeClass($activeMenu, c.cls.open);
				});
			}
		}

		_.slideDown(el);
		_.addClass(el, c.cls.open);

		if (isSub) {
			$parentMenu = _.parents(el, `.${c.cls.open}`);
			Object.keys($parentMenu).forEach((key) => {
				if ($parentMenu[key] && $parentMenu[key] !== el) {
					$parentMenu = $parentMenu[key];
					$parentMenu.style.height = '';
				}
			});
		}

		_.trigger($accordion, 'openCb');
	}

	/**
	 * closeAllMenus
	 * @type {Function}
	 */
	function closeAllMenus() {
		const $activeTriggers = $accordion.querySelectorAll(`.${c.dom.btn}.${c.cls.active}`);
		let $trigger;
		let $menu;
		let i;

		if ($activeTriggers.length > 0) {
			for (i = 0; i < $activeTriggers.length; i += 1) {
				$trigger = $activeTriggers[i];
				$menu = $trigger.nextElementSibling;

				_.removeClass($trigger, c.cls.active);
				closeMenu($menu);
			}
		}
	}

	/**
	 * responsive
	 * @type {Function}
	 */
	function responsive() {
		const activeViews = c.views.active;
		const inactiveViews = c.views.inactive;
		let view;
		let i;

		for (i = 0; i < activeViews.length; i += 1) {
			view = activeViews[i];

			if (c.views.current !== view) {
				_.mq({
					view,
					callback: activeCb
				});
			}
		}

		for (i = 0; i < inactiveViews.length; i += 1) {
			view = inactiveViews[i];

			if (c.views.current !== view) {
				_.mq({
					view,
					callback: inactiveCb
				});
			}
		}
	}

	/**
	 * active callback
	 * @return {Function}
	 */
	function activeCb() {
		const { view } = this;
		c.views.current = view;
		bindEvents();
	}

	/**
	 * inactive callback
	 * @return {Function}
	 */
	function inactiveCb() {
		const { view } = this;
		c.views.current = view;
		unbindEvents();
		resetActive(true);
	}

	/**
	 * active callback
	 * @return {Function}
	 */
	function resetActive(fullReset) {
		const $activeTriggers = $accordion.querySelectorAll(`.${c.dom.btn}.${c.cls.active}`);
		let $trigger;
		let $menu;
		let i;
		let height;

		if ($activeTriggers.length > 0) {
			for (i = 0; i < $activeTriggers.length; i += 1) {
				$trigger = $activeTriggers[i];
				$menu = $trigger.nextElementSibling;

				if (fullReset) {
					_.removeClass($trigger, c.cls.active);
					_.removeClass($menu, c.cls.open);
					$menu.style.height = '';
					$menu.style.paddingTop = '';
					$menu.style.paddingBottom = '';
				} else {
					height = _.getHiddenStyles($menu).elHeight;
					$menu.style.height = `${height}px`;
				}
			}
		}
	}

	/**
	 * open menu by url
	 */
	function openMenuByUrl() {
		const { hash } = window.location;
		let elIsButton;
		let $btn;
		let $menu;

		// if hash doesn't exist, exit function
		if (!hash) return;

		// set el from hash
		const id = hash.replace('#', '');
		const $el = document.getElementById(id);

		// if element exists, continue, else warn user
		if ($el) {
			elIsButton = _.hasClass($el, c.dom.btn);
			$btn = elIsButton ? $el : $el.querySelector(`.${c.dom.btn}`);
			$menu = $btn.nextElementSibling;

			// open menu
			if ($menu) {
				openMenu($menu);
				_.addClass($btn, c.cls.active);
			}
		} else {
			console.warn(`Hash element ${id} doesn't exist.`);
		}
	}

	/**
	 * open option
	 * @param {number} option
	 */
	function openOption(option) {
		const $activeTriggers = $accordion.querySelectorAll(`.${c.dom.btn}`);
		let $trigger;
		let $menu;

		if ($activeTriggers.length) {
			$trigger = $activeTriggers[option];
			$menu = $trigger.nextElementSibling;

			openMenu($menu);
			_.addClass($menu, c.cls.open);
			_.addClass($trigger, c.cls.active);
		}
	}

	/**
	 * callbacks
	 */
	function callbacks() {
		_.addEvent({
			id: $accordion,
			event: 'openCb',
			fn() {
				if (typeof c.cb.open === 'function') {
					c.cb.open();
				}
				return undefined;
			}
		});

		_.addEvent({
			id: $accordion,
			event: 'closeCb',
			fn() {
				if (typeof c.cb.close === 'function') {
					c.cb.close();
				}
				return undefined;
			}
		});
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init,
		closeAll: closeAllMenus,
		closeMenu,
		unbindEvents
	};

};
