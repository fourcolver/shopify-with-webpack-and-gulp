/**
 * debounce
 * @param {fn} The function that needs to be debounce
 * @param {int} Miliseconds for how often to execute the function
 * @param {boolean} Execute immediately or after function is complete
 */
_.debounce = function(func, threshold, execAsap) {
	let timeout;

	return function debounced () {
		let obj = this, args = arguments;

		function delayed () {
			if (! execAsap)
				func.apply(obj, args);
			timeout = null;
		}

		if (timeout)
			clearTimeout(timeout);
		else if (execAsap)
			func.apply(obj, args);

		timeout = setTimeout(delayed, threshold || 100);
	};
};