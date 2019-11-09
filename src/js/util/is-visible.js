/**
 * is visible
 * @param  {element} el
 * @return {boolean}
 */
_.isVisible = function(el) {
	return el.offsetParent !== null;
};