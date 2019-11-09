/**
 * waypoint
 * @param  {Object} opts
 * @return {_.waypoint~init}
 */
_.waypoint = function(opts) {
	let config = {
			el: null,
			in: null,
			out: null,
			offset: null
		},
		c = _.extend(config, opts);

	/**
	 * init
	 */
	function init() {
		addEvents();
		checkWindowPosition();
	}

	/**
	 * add events
	 */
	function addEvents() {

		// scroll
		window.addEventListener('scroll', checkWindowPosition, false);

		// resize
		_.windowResize(checkWindowPosition, 400);
	}

	/**
	 * check window position
	 */
	function checkWindowPosition() {
		let windowPos = window.pageYOffset || document.documentElement.scrollTop,
			elOffset = c.el.offsetTop,
			isPastEl;

			// offset
		if (c.offset) {
			elOffset -= c.offset;
		}

		isPastEl = windowPos > elOffset;

		if (isPastEl) {
			if (typeof c.in === 'function') c.in();
		} else {
			if (typeof c.out === 'function') c.out();
		}
	}

	return init();
};