/**
 * format price number
 * @param  {number} price e.g. "1200"
 * @return {number}       e.g. "12.00"
 */
_.formatPriceNumber = function(price) {
	return parseFloat((price / 100).toFixed(2));
};