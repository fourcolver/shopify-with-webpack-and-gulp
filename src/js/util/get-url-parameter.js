/**
 * get url parameter
 * @param {string} sParam - parameter name
 */
_.getUrlParameter = function(sParam) {
	let sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLletiables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLletiables.length; i++) {
		sParameterName = sURLletiables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};