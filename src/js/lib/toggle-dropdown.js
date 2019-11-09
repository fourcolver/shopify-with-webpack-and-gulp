/**
 * Toggle Dropdown
 */
SDG.toggleDropdown = function(opts) {
	const config = {
		cb: {
			before_open: null,
			after_open: null,
			before_close: null,
			after_close: null
		},
		click_outside: {
			enable: true,
			exclude_selectors: '' // defaults to c.dom.btn, see 'excludedSelectors' below
		},
		cls: {
			active: 'is-active',
			visible: 'is-visible'
		},
		dom: {
			btn: 'menuShow',
			menu: 'menu'
		},
		timer: {
			close: null, // Delay for close animation
			default: 250, // Default delay
			open: null // Delay for open animation
		}
	};

	/**
	 * shorthand config
	 * @type {[type]}
	 */
	let c = config;
	if (opts) c = _.extend(config, opts);

	/**
	 * cached vars
	 */
	const menu = document.getElementById(c.dom.menu);
	const btn = document.getElementById(c.dom.btn);
	const excludedSelectors = c.click_outside && !c.click_outside.exclude_selectors ? `#${c.dom.btn}` : c.click_outside.exclude_selectors;

	/**
	 * init
	 */
	function init() {
		if (menu) {
			mapTimers();
			bindEvents();
			kbEvent();
			callbacks();
		}
	}


	function bindEvents() {
		_.addEvent({
			id: c.dom.btn,
			event: 'click',
			fn: toggleMenu
		});

		if (c.click_outside.enable) {
			_.clickOutside({
				callback: toggleMenu,
				condition: isActive,
				exclude_selectors: excludedSelectors,
				selector: `#${c.dom.menu}`
			});
		}
	}

	function toggleMenu() {
		if (isActive()) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function openMenu() {
		_.addClass(btn, c.cls.active);
		_.addClass(menu, c.cls.visible);

		// Trigger Callbacks before the menu opens
		_.trigger(btn, 'beforeToggleOpen');

		setTimeout(() => _.trigger(btn, 'afterToggleOpen'), c.timer.open);
	}

	function closeMenu() {
		_.removeClass(btn, c.cls.active);
		_.removeClass(menu, c.cls.visible);

		// Trigger callbacks before modal closes
		_.trigger(btn, 'beforeToggleClose');

		setTimeout(() => _.trigger(btn, 'afterToggleClose'), c.timer.close);
	}

	/**
	 * keyboard event
	 * @description add key board event on keyup
	 */
	function kbEvent() {
		document.addEventListener('keyup', getKey);
	}

	/**
	 * get key pressed
	 * @description function that's executed on keypress. checks the keycode value,
	 * if it matches with the escape key close all modals.
	 */
	function getKey(e) {
		if (e.keyCode === 27) {
			closeMenu();
		}
	}

	function isActive() {
		return _.hasClass(menu, c.cls.visible);
	}

	/**
	 * callbacks
	 * @type {function}
	 */
	function callbacks() {

		_.addEvent({
			id: c.dom.btn,
			event: 'beforeToggleOpen',
			fn: () => (c.cb.before_open !== null ? c.cb.before_open() : null)
		});

		_.addEvent({
			id: c.dom.btn,
			event: 'afterToggleOpen',
			fn: (c.cb.after_open !== null ? c.cb.after_open() : null)
		});

		_.addEvent({
			id: c.dom.btn,
			event: 'beforeToggleClose',
			fn: (c.cb.before_close !== null ? c.cb.before_close() : null)
		});

		_.addEvent({
			id: c.dom.btn,
			event: 'afterToggleClose',
			fn: (c.cb.after_close !== null ? c.cb.after_close() : null)
		});
	}

	/**
	 * map timers
	 * @description setting close timer and open timer if they are not set
	 */
	function mapTimers() {
		if (c.timer.close === null) c.timer.close = c.timer.default;
		if (c.timer.open === null) c.timer.open = c.timer.default;
	}

	return init();

};