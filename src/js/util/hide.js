/**
 * hide
 * @param {Object} obj - dom element to hide
 */
_.hide = function(obj) {
	if (obj && obj.style.display !== 'none') {
		obj.style.display = 'none';
	}
};