/**
 * replace
 * @param  {string} string
 * @param  {string} needle   searched value
 * @param  {string} newValue new value you wish to replace the needle with
 * @return {string}
 */
_.replace = function(string, needle, newValue) {
	let newString;

	// if string contains needle, return new value
	if (string.indexOf(needle) !== -1) {
		newString = string.replace(needle, newValue);
	}

	// else return string as-is if needle could not be found
	else {
		newString = string;
	}

	return newString;
};