/**
 * reduce array
 */
 _.reduceArray = function(r) {
 	let n = [],
		c,
 		i,
 		o;

 	if (Array.isArray(r)) {
 		c = r.length;
 		for (i = 0; i < c; i++) {
 			o = r[i];
 			if (n.indexOf(o) === -1) {
 				n.push(o);
 			}
 		}
 	} else {
 		console.warn('argument not an array.');
 		console.warn(r);
 		return false;
 	}

 	return n;
};