_.removeClassByPrefix = function(el, prefix) {
	const regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
	el.className = el.className.replace(regx, '');
	return el;
};