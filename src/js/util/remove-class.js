/**
 * remove class
 * @param {element} el
 * @param {string} className
 */
_.removeClass = function(el, className) {
	if (_.hasClass(el, className)) {
		if (el.classList) {
			el.classList.remove(className);
		}
		else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
};