/**
 * add class
 * @param {string} el
 * @param {string} className
 */
_.addClass = function(el, className) {

	if (!_.hasClass(el, className)) {
		if (el.classList) {
			el.classList.add(className);
		}
		else {
			el.className += ' ' + className;
		}
	}
};