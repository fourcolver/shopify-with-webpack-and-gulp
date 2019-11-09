/**
 * transition
 * fires a function before and after a timeout
 * @param {object} opts
 */
_.transition = function(opts) {
	if (opts.before === undefined) opts.before = null;
	if (opts.after === undefined) opts.before = null;
	if (opts.time === undefined) opts.time = 400;

	if (typeof opts.before === 'function') {
		opts.before();
	}

	if (typeof opts.after === 'function') {
		setTimeout(opts.after, opts.time);
	}
};