/**
 * has class
 * @param  {element}  el
 * @param  {string}  className
 * @return {boolean}
 */
_.hasClass = function(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	}
	else {
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	}
};