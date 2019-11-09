/**
 * array to lower
 */
_.arrayToLower = function(r) {
	let c,
		i;

	if (Array.isArray(r)) {
		c = r.length;
		for (i = 0; i < c; i++) {
			r[i] = r[i].toLowerCase();
		}
	} else {
		console.warn('argument not an array.');
		console.warn(r);
		return false;
	}

	return r;
};