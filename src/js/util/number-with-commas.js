/**
 * number with commas
 * @param  {*}
 * @return {String}
 */
_.numberWithCommas = function(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};