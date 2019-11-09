/**
 * window resize
 * Run functions on window resize.
 * @param {function} function to call on window resize
 * @param {int} how often in miliseconds to fire the debounced function
 * @param {boolean} sets whether to execute the function as soon as possible or not.
 */
_.windowResize = function(fn = null, threshold = 100, execAsap = false) {
	if (fn) {
		window.addEventListener('resize', _.debounce(fn, threshold, execAsap));
	} else {
		console.warn('No function defined.');
	}
};