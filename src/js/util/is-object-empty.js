/**
 * is object empty
 * @param  {Object}  obj
 * @return {boolean}
 */
_.isObjectEmpty = function(obj) {
	return _.isObject(obj) && Object.keys(obj).length === 0;
};