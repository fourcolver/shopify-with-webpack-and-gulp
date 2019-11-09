/**
 * click outside
 * @param  {Object} opts
 * @return {_.clickOutside~init}
 */
_.clickOutside = function(opts) {
	let config = {
			callback: null,
			condition: null,
			exclude_selectors: '',
			selector: ''
		},
		c = _.extend(config, opts),

		// cached globals
		excludedElements = [];

	/**
	 * init
	 */
	function init() {
		addEvents();
	}

	/**
	 * setup excluded
	 */
	function setupExcluded() {

		excludedElements = [];

		let excludedSelectors = [];

		// if there are no excluded selectors, exit function
		if (! c.exclude_selectors) return;

		// if there's a comma, i.e. multiple selectors, create array from list
		// else push the single item to the array
		if (c.exclude_selectors.indexOf(',') !== -1) {
			excludedSelectors = c.exclude_selectors.split(',');
		} else {
			excludedSelectors.push(c.exclude_selectors);
		}

		// query selectors and push them to array
		excludedSelectors.forEach(addElementToExcludedArray);
	}

	/**
	 * add element to excluded array
	 * @callback
	 * @param {String} selector
	 * @param {Number} i
	 * @param {Array}  arr
	 */
	function addElementToExcludedArray(selector, i, arr) {
		let el = document.querySelectorAll(selector),
			elCount = el.length,
			children,
			childCount,
			itr,
			childItr;

		if (el) {
			for (itr = 0; itr < elCount; itr++) {
				excludedElements.push(el[itr]);

				children = el.children;
				childCount = children ? children.length : null;

				if (childCount) {
					for (childItr=0;childItr<childCount;childItr++) {
						excludedElements.push(children[childItr]);
					}
				}
			}
		}
	}

	/**
	 * is excluded element
	 * @callback
	 * @param  {Element} el
	 * @param  {Number}  i
	 * @param  {Array}   arr
	 * @return {Boolean}
	 */
	function isExcludedElement(el, i, arr) {
		return el === this;
	}

	/**
	 * add events
	 */
	function addEvents() {

		// document click
		_.addEvent({
			id: document,
			event: 'click',
			fn: onDocumentClick
		});
	}

	/**
	 * on document click
	 * @param {Object} e event
	 */
	function onDocumentClick(e) {

		setupExcluded();

		let isExElement = excludedElements.some(isExcludedElement, e.target);

		let isConditionFn = typeof c.condition === 'function',
			hasMetConditions = isExElement ? isConditionFn && ! isExElement : isConditionFn && c.condition(),
			hasClickedOutside;

		// if conditions have not been met, exit function
		if (! hasMetConditions) return;

		// traverse up dom to see if user clicked within selector
		hasClickedOutside = ! _.parents(e.target, c.selector);

		// if clicked outside, fire callback
		if (typeof c.callback === 'function' && hasClickedOutside) c.callback();
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init: init()
	};
};