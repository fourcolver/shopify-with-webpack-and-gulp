/**
 * converts a string to a handle
 */
_.handleize = function(str) {
	if (! str) return;
	str = str.replace(/[^\w\s]/gi, '');
	str = str.replace(/\s\s+/g, '-');
	str = str.replace(/[\W_]/g, '-');
	str = str.toLowerCase();
	return str;
};