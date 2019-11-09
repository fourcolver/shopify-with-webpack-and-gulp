/**
 * format price
 * @param  {number} price e.g. "1200"
 * @return {string}       e.g. "12.00"
 */
_.formatPrice = function(price) {
	return (price / 100).toFixed(2);
};