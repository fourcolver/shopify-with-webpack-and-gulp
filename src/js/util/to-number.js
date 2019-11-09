/**
 * to number
 * @param  {number|string} n
 * @return {number}
 */
_.toNumber = function(n) {
	if (typeof n === 'string') n = parseInt(n);
	return n;
};