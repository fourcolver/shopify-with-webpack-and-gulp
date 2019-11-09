/**
 * is object
 * @param  {*}       data any type
 * @return {boolean}
 */
_.isObject = function(data) {
	return Object.prototype.toString.call(data) === '[object Object]';
};