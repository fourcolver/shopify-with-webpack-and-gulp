/**
 * sticky
 * @version  0.0.2
 * @param    {Object} opts
 * @return   {Object}
 * @requires [lib/util.js]
 */
SDG.sticky = function(opts) {
	const config = {
		cls: {
			bottom: 'is-bottom',
			fixed: 'is-fixed',
		},
		id: {
			el: 'sticky',
			page_content: 'main',
			header: 'hdr',
		},
		fixed: false, // boolean
		fixed_header: false, // boolean
		offset_bottom: null, // number
		offset_top: null, // number, should match top positioning of fixed class
		// when fixed_header = false
		views_stick: 'desktop',
		views_unstick: 'mobile',
	};
	const c = _.extend(config, opts);

	// state
	const state = {
		is_active: false,
		is_bottom: false,
		is_bound: false,
		is_fixed: false
	};

	// cached globals
	const $body = document.body;
	const $docEl = document.documentElement;
	const $pageContent = document.getElementById(c.id.page_content);
	const $header = document.getElementById(c.id.header);
	const $el = document.getElementById(c.id.el);

	// global values
	let bottom;
	let headerHeight;
	let pageContentHeight;
	let pageContentOffset;

	let elHeight;
	let elOffset;
	let elWidth;

	let isPastBottom;
	let isPastEl;
	let view;
	let windowPos;

	/**
	 * init
	 */
	function init() {

		// set active
		state.is_active = true;

		// add events
		if (!state.is_bound) {
			addEvents();
			state.is_bound = true;
		}

		// init responsive
		responsive();
	}

	/**
	 * stick
	 */
	function stick() {

		// add sticky
		addScrollEventSticky();
		resetStickyStyles();
		setValuesResponsive();
		checkWindowPosition();
	}

	/**
	 * unstick
	 */
	function unstick() {

		// remove sticky
		removeScrollEventSticky();
		resetAllStyles();
	}

	/**
	 * responsive
	 */
	function responsive() {

		// if state is inactive, exit function
		if (!state.is_active) return;

		// sticky view
		_.mq({
			view: c.views_stick,
			callback() {
				view = this.view;
				stick();
			}
		});

		// unsticky view
		_.mq({
			view: c.views_unstick,
			callback() {
				if (view !== this.view) {
					view = this.view;
					unstick();
				}
			}
		});
	}

	/**
	 * add events
	 */
	function addEvents() {

		// resize
		_.windowResize(responsive, 200);
	}

	/**
	 * add scroll event sticky
	 */
	function addScrollEventSticky() {
		window.addEventListener('scroll', checkWindowPosition, false);
	}

	/**
	 * remove scroll event sticky
	 */
	function removeScrollEventSticky() {
		window.removeEventListener('scroll', checkWindowPosition, false);
	}

	/**
	 * set values responsive
	 */
	function setValuesResponsive() {

		// set values
		elHeight = $el.scrollHeight;
		elWidth = $el.offsetWidth;
		elOffset = getOffsetTop($el);

		// fixed offset
		if (c.fixed) {

			elOffset = 0;

		} else {

			// top offset
			if (c.offset_top) elOffset -= c.offset_top;

			// header offset
			if (c.fixed_header) {
				headerHeight = $header.offsetHeight;
				pageContentOffset = getOffsetTop($pageContent) - headerHeight;
				elOffset -= headerHeight;
			}
		}
	}

	/**
	 * check window position
	 */
	function checkWindowPosition(force) {
		if (typeof force === 'undefined') force = false;

		// set values
		pageContentHeight = $pageContent.scrollHeight;
		windowPos = window.pageYOffset || $docEl.scrollTop;
		bottom = pageContentHeight - elHeight;

		// bottom offsets
		if (c.offset_bottom) bottom -= c.offset_bottom;
		if (c.offset_top) bottom -= c.offset_top;
		if (c.fixed_header && !c.fixed) bottom += pageContentOffset;

		// set booleans
		isPastEl = windowPos >= elOffset;
		isPastBottom = windowPos > bottom;

		// check scroll positions
		if (isPastEl) {
			if (!isPastBottom) {
				removeBottomStyles();
				addStickyStyles();
			} else {
				removeStickyStyles(force);
				addBottomStyles();
			}
		} else {
			removeStickyStyles();
		}
	}

	/**
	 * add sticky styles
	 */
	function addStickyStyles() {

		// if already sticky, exit function
		if (state.is_fixed) return;

		// set sticky state
		state.is_fixed = true;

		// add sticky styles
		_.addClass($el, c.cls.fixed);
		$el.style.width = `${elWidth}px`;
	}

	/**
	 * remove sticky styles
	 * @param {boolean} force
	 */
	function removeStickyStyles(force) {

		// if state is already not sticky, exit function
		if (!state.is_fixed && !force) return;

		// set sticky state to false
		state.is_fixed = false;

		// remove sticky styles
		_.removeClass($el, c.cls.fixed);
		$el.style.width = 'auto';
	}

	/**
	 * add bottom styles
	 */
	function addBottomStyles() {

		// if state is already bottom, exit function
		if (state.is_bottom) return;

		// set state
		state.is_bottom = true;

		// add bottom class
		_.addClass($el, c.cls.bottom);
	}

	/**
	 * remove bottom styles
	 * @param {boolean} force
	 */
	function removeBottomStyles(force) {

		// if state is already not bottom, exit function
		if (!state.is_bottom && !force) return;

		// set state
		state.is_bottom = false;

		// remove bottom styles
		_.removeClass($el, c.cls.bottom);
	}

	/**
	 * reset sticky styles
	 */
	function resetStickyStyles() {
		removeStickyStyles(true);
	}

	/**
	 * reset all styles
	 */
	function resetAllStyles() {
		removeStickyStyles(true);
		removeBottomStyles(true);
	}

	/**
	 * destroy
	 */
	function destroy() {
		state.is_active = false;
		unstick();
	}

	/**
	 * get offset top
	 * @param  {Element} el
	 * @return {number}
	 */
	function getOffsetTop(el) {
		const box = el.getBoundingClientRect();
		const scrollTop = window.pageYOffset || $docEl.scrollTop || $body.scrollTop;
		const clientTop = $docEl.clientTop || $body.clientTop || 0;
		const top = box.top + scrollTop - clientTop;

		return Math.round(top);
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init,
		destroy,
		stick,
		unstick,
	};
};