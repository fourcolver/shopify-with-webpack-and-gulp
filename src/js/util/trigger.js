/**
 * trigger event
 * @param  {object} el - Element that event is being triggered on.
 * Must pass selected dom element, not just a string.
 * @param  {string} eventName - Name of custom event that needs to be trigger.
 * @param  {boolean} bubbles - A Boolean indicating whether the event bubbles up
 * through the DOM or not. Default: true
 * @param  {boolean} cancelable - A Boolean indicating whether the event is cancelable.
 * Default: true
 * @return {function} - Dispatches the custom event that's bound to the element.
 */
_.trigger = function(el, eventName, obj = null, bubbles = true, cancelable = true) {
	if (el === undefined || eventName === undefined) return false;

	const event = new CustomEvent(eventName, {
		detail: {
			el,
			time: new Date(),
			obj
		},
		bubbles,
		cancelable
	});

	el.dispatchEvent(event);

	return undefined;
};