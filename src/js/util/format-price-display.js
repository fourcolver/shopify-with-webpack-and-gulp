/**
 * format price display
 * @param  {number} price e.g. "1200"
 * @return {string}       e.g. "$12"
 */
_.formatPriceDisplay = function(price) {
	return '$' + _.formatPrice(price).replace(/\.00$/, '');
};