/**
 * index
 * @param  {Element} node
 * @return {Number}
 */
 _.index = function(node) {
	const c = node.parentNode.children, i = 0;
    for (; i < c.length; i++ )
        if ( c[i] === node ) return i;
};