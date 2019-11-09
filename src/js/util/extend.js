/**
 * extend
 * extends a js object
 * @param  {Object} config
 * @param  {Object} obj
 * @return {Object}
 */
_.extend = function(config, obj) {
	obj = obj || {};

	Object.keys(config).forEach(function(key) {
		if (obj[key] === undefined) {
			obj[key] = config[key];
		} else {
			if (obj[key] && _.isObject(obj[key]) && _.isObject(config[key])) {
				Object.keys(config[key]).forEach(function(childKey) {
					if (obj[key][childKey] === undefined) {
						obj[key][childKey] = config[key][childKey];
					}
				});
			}
		}
	});

	return obj;
};