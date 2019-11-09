/**
 * is delineated array
 * @param  {*}       data any type
 * @return {boolean}
 */
_.isDelimitedArray = function(str, delimiter) {
	if (! str) {
		console.warn('No string defined');
		return false;
	}

	if (! delimiter) {
		delimiter = ',';
	}

	return str.indexOf(delimiter) !== -1 ? true : false;
};