/**
 * Dom Event
 * @type {function}
 * @param {object | string} obj.id -  Text string for the id of the dom element bind events. If used in conjunction with className the ID should repesent t he parent object's id.
 * @param {object | string} obj.className - Text string for the class name of the dom element to bind events. Must be used in conjunction with an ID to reduce DOM traversal.
 * @param {object | string} object.event - Event which triggers the function.
 * @param {object.function} object.fn - Function to bind to each element.
 * @param {boolean} - applyEvent - Dictates whether to addEventListener or removeEventListener
 */
_.domEvent = function(opts,applyE) {
	let c = opts,
		eApply = applyE !== undefined ? applyE : true,
		$id,
		$class,
		isString,
		hasIds,
		hasEvents,
		$trigger,
		i,
		idArr,
		eventArr;

	/**
	 * init
	 * @return {function} Checks if c.id, c.fn, and c.event are defined. If not add event is skipped. This also maps the letiables for $id and domClass
	 */
	function init() {
		if (c.id) { // Is c.id set?

			if (c.fn  || c.event) { // If c.fn and c.event are set then execute functions.

				checkForArray();

				if (hasIds) {
					idArr = c.id.split(',');

					for (i = 0; i < idArr.length; i++) {
						c.id = idArr[i];
						bindEvents();
					}

				} else {
					bindEvents();
				}

			} else {
				if (c.fn === null) { // Check if c.fn is set, if not warn the developer.
					console.warn('No function defined.');
				}
				if (c.event === null) { // Check if c.event is set, if not warn the developer.
					console.warn('No event defined.');
				}
			}
		} else { // if c.id is not set, then warn the developer.
			console.warn('No ID defined.');
		}
	}

	/**
	 * check for array
	 */
	function checkForArray() {
		isString = typeof(c.id) === 'string' ? true : false;

		if (isString) {
			hasIds = _.isDelimitedArray(c.id);
		}

		hasEvents = _.isDelimitedArray(c.event);
	}

	/**
	 * bind events
	 * @type {Function}
	 */
	function bindEvents() {

		maplets(); // Map vas called inside c.fn and c.event check to avoid unnecessary DOM search.

		if (c.className) {
			bindLoop(); // If a class value was set, bind the event to dom elements within a parent id.
		} else {
			bindSingle(); // If only an id was set and no className, then bind the event to a single id.
		}
	}

	/**
	 * map lets
	 * @return {function} Sets domId letiable and if c.className exists, sets domClass value.
	 */
	function maplets() {

		if (isString) {
			$id = document.getElementById(c.id);
		} else {
			$id = c.id;
		}

		if ($id) {
			if (c.className === null) {
				$class = null;
			} else {
				$class = $id.querySelectorAll('.' + c.className);
			}
		} else {
			if (isString) {
				console.warn('Could not find id ' + c.id);
			} else {
				console.warn('Could not find element.');
			}
		}
	}

	/**
	 * bind loop
	 * @return {function} Bind events to dom elements within the defined c.id dom element.
	 */
	function bindLoop() {
		if ($class) {
			for (i = 0; i < $class.length; i++) {
				$trigger = $class[i];

				if ($trigger) {

					if (eApply) {
						if (hasEvents) {

							eventArr = c.event.split(',');

							for ( i = 0; i < eventArr.length; i++) {
								$trigger.addEventListener(eventArr[i],c.fn,null);
							}
						} else {
							$trigger.addEventListener(c.event,c.fn,null);
						}
					} else {
						$trigger.removeEventListener(c.event,c.fn,null);
					}
				}
			}
		}
	}

	/**
	 * bind single
	 * @return {function} Add event listener to a single dom element based on id.
	 */
	function bindSingle() {
		if ($id) {

			if (eApply) {
				if (hasEvents) {
					eventArr = c.event.split(',');

					for (i = 0; i < eventArr.length; i++) {
						$id.addEventListener(eventArr[i],c.fn,false);
					}
				} else {
					$id.addEventListener(c.event,c.fn,false);
				}

			} else {
				$id.removeEventListener(c.event,c.fn,false);
			}
		}
	}

	return init();
};

/**
 * Add Event
 * @type {function}
 * @param {object | string} obj.id -  Text string for the id of the dom element bind events. If used in conjunction with className the ID should repesent the parent object's id.
 * @param {object | string} obj.className - Text string for the class name of the dom element to bind events. Must be used in conjunction with an ID to reduce DOM traversal.
 * @param {object | string} object.event - Event which triggers the function.
 * @param {object.function} object.fn - Function to bind to each element.
 */
_.addEvent = function(opts) {
	if (opts === undefined) {
		console.warn('_.addEvent requires a config object.');
	} else {
		_.domEvent(opts, true);
	}
};

/**
  * Remove Event
  * @type {function}
  * @param {object | string} obj.id -  Text string for the id of the dom element bind events. If used in conjunction with className the ID should repesent the parent object's id.
  * @param {object | string} obj.className - Text string for the class name of the dom element to bind events. Must be used in conjunction with an ID to reduce DOM traversal.
  * @param {object | string} object.event - Event which triggers the function.
  * @param {object.function} object.fn - Function to bind to each element.
  */
_.removeEvent = function(opts) {
	if (opts === undefined) {
		console.warn('_.removeEvent requires a config object.');
	} else {
		_.domEvent(opts, false);
	}
};