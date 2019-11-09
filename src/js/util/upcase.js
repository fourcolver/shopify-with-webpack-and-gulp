/**
 * upcase first letter of a string.
 */
_.upcase = function(str) {
	return str.replace(
		/\w\S*/g,
		txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
};