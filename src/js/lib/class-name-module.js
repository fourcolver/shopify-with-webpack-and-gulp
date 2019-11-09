/**
 * modify class name with namespace
 *
 * @param {String} class
 * @return {String}
 */
function namespacedClasses(className, namespace) {
	return `${className} ${namespace}-${className}`;
}

export default namespacedClasses;