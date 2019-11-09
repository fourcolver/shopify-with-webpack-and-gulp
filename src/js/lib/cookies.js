/**
 * set cookie
 * @param  {String} cName name of the cookie
 * @param  {String} value  value of the cookie
 * @param  {Number} exdays number of days to set the cookie
 * @return {Function}      sets cookie
 */
SDG.setCookie = function(cName, value, exdays) {
	const exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	const cValue = encodeURI(value)
	+ ((exdays === null) ? '' : (`; expires=${exdate.toUTCString()}`));
	document.cookie = `${cName} = ${cValue}; path=/`;
};

/**
 * get cookie
 * @param  {String} cName name of the cookie
 * @return {String}        value of the cookie
 */
SDG.getCookie = function(cName) {
	let i;
	let x;
	let y;
	const ARRcookies = document.cookie.split(';');
	for (i = 0; i < ARRcookies.length; i += 1) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, '');
		if (x === cName) {
			return decodeURI(y);
		}
	}
	return false;
};

/**
 * delete cookie
 * @param {string} cName name of the cookie
 */
SDG.deleteCookie = function(cName) {
	document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};