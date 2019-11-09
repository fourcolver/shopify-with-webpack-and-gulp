/**
 * get query string
 * @param  {Object} object
 * @return {string}
 */
_.getQueryString = function(object) {
	return Object.keys(object).reduce(function(acc, item) {
		const prefix = ! acc ? '' : acc + '&';
		return prefix + _.encode(item) + '=' + _.encode(object[item]);
	}, '');
};