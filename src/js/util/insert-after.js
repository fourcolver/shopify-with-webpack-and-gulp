/**
 * Inserts a dom element after a specified node
 * @param  {[Dom Node} newNode
 * @param  {Dom Node} referenceNode
 * @return {Function}
 */
_.insertAfter = function(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};