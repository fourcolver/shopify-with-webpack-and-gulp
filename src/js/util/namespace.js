/**
 * namespace
 * @param  {Object} obj
 * @param  {String} Name
 * @return {Object}
 */
_.namespace = function(obj,name) {
	obj = obj || {};

	obj = JSON.parse(JSON.stringify(obj));

	let	objNode,
		namedlet;

	if (obj) {
		if (obj && _.isObject(obj)) {
			Object.keys(obj).forEach(function(key) {
				if (obj[key]) {
					if (typeof(obj[key]) !== 'object') {
						objNode = obj[key].toString();
						namedlet = name + objNode.charAt(0).toUpperCase() + objNode.slice(1);
						obj[key] = namedlet;
					} else if (Array.isArray(obj[key])) {
						obj[key].forEach(function(id, idx, arr) {
							objNode = name + id.charAt(0).toUpperCase() + id.slice(1);
							arr[idx] = objNode;
						});
					}
				}
			});
		} else {
			console.warn('obj is not defined, or is not an object');
		}
	}

	return obj;
};