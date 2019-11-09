/**
 * remove protocol
 * @param  {string} url
 * @return {string}
 */
_.removeProtocol = function(url) {
	return url.replace(/http(s)?:/, '');
};