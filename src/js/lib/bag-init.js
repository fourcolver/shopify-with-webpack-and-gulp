/**
 * bag timeout
 */
SDG.Bag.timeout = null;

SDG.Bag.clearTimeout = function() {
	if (SDG.Bag.timeout) {
		clearTimeout(SDG.Bag.timeout);
	}
};

/**
 * is open / is opening
 */
SDG.Bag.isOpen = false;
SDG.Bag.isOpening = false;

/**
 * open bag
 * @return {Function} adds expose class from the body
 */
SDG.Bag.open = function(e) {
	const c = SDG.Bag.config;

	// cached globals
	const $body = document.body;

	if (e) {
		e.preventDefault();

		if (e.type === 'mouseenter') {
			SDG.Bag.clearTimeout();
			_.addClass($body, c.cls.expose);
		}

		if (e.type === 'click') {
			if (SDG.Bag.isOpen) {
				SDG.Bag.close();
			} else {
				SDG.Bag.isOpen = true;
				_.addClass($body, c.cls.expose);
			}
		}

	} else {
		_.addClass($body, c.cls.expose);
	}
};

/**
 * wait to close bag
 * @return {Function} removes expose class from the body
 */
SDG.Bag.waitToClose = function() {
	const c = SDG.Bag.config;

	SDG.Bag.timeout = setTimeout(SDG.Bag.close, c.timer.close);
};


/**
 * close bag
 * @return {Function} removes expose class from the body
 */
SDG.Bag.close = function(e) {
	const c = SDG.Bag.config;

	// cached globals
	const $body = document.body;

	if (e) {
		e.preventDefault();
	}

	_.removeClass($body, c.cls.expose);

	// reset flags
	SDG.Bag.isOpen = false;
	SDG.Bag.isOpening = false;
};

/**
* init
* @type {Function}
*/
SDG.Bag.init = function() {
	const c = SDG.Bag.config;

	function init() {
		const freeShippingCta = SDG.freeShippingCta();

		// Refresh Bag
		SDG.Bag.refresh();

		// Free shipping cta
		freeShippingCta.init();

		// Add Events
		addEvents();
	}

	function addEvents() {
		// bag toggle
		if (c.show_event === 'mouseenter') {
			responsive();
			_.windowResize(responsive);
		} else {
			_.addEvent({
				id: c.dom.bag_btn,
				event: c.show_event,
				fn: SDG.Bag.open
			});
		}

		// bag close
		_.addEvent({
			id: c.dom.bag_close,
			event: 'click',
			fn: SDG.Bag.close
		});

		// close on escape get
		document.addEventListener('keyup', getKeyCode);

		_.clickOutside({
			callback: SDG.Bag.close,
			condition: isActive,
			exclude_selectors: c.exclude_selectors,
			selector: `#${c.dom.bag}`
		});
	}

	function isActive() {
		const $body = document.body;

		return _.hasClass($body, c.cls.expose);
	}

	/**
	 * get keycode
	 * @return {Function} close modal on escape key
	 */
	function getKeyCode(e) {
		if (e.keyCode === 27) {
			SDG.Bag.close();
		}
	}

	/**
	 * bind click
	 * @type {Function}
	 */
	function bindClick() {
		_.addEvent({
			id: c.dom.bag_btn,
			event: 'click',
			fn: SDG.Bag.open
		});

		unbindHover();
	}

	/**
	 * bind click
	 * @type {Function}
	 */
	function unbindClick() {
		_.removeEvent({
			id: c.dom.bag_btn,
			event: 'click',
			fn: SDG.Bag.open
		});
	}

	/**
	 * bind hover
	 * @type {Function}
	 */
	function bindHover() {
		_.addEvent({
			id: `${c.dom.bag_btn},${c.dom.bag}`,
			event: 'mouseenter',
			fn: SDG.Bag.open
		});
		_.addEvent({
			id: `${c.dom.bag_btn},${c.dom.bag}`,
			event: 'mouseleave',
			fn: SDG.Bag.waitToClose
		});
		unbindClick();
	}

	/**
	 * unbind hover
	 * @type {Function}
	 */
	function unbindHover() {
		_.removeEvent({
			id: `${c.dom.bag_btn},${c.dom.bag}`,
			event: 'mouseenter',
			fn: SDG.Bag.open
		});
		_.removeEvent({
			id: `${c.dom.bag_btn},${c.dom.bag}`,
			event: 'mouseleave',
			fn: SDG.Bag.waitToClose
		});
	}

	/**
	 * responsive
	 * @type {Function}
	 */
	function responsive() {
		_.mq({
			view: 'desktop',
			callback: bindHover
		});
		_.mq({
			view: 'mobile',
			callback: bindClick
		});
	}

	return init();
};