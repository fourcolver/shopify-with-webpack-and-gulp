/**
 * object to query string
 * if no object is provided, function will return original data
 * @param  {Object} data
 * @return {string}
 */
_.objectToQueryString = function(data) {
	return _.isObject(data) ? _.getQueryString(data) : data;
};