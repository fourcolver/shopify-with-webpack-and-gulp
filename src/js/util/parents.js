/**
 * is parent
 * @param  {Node} elem
 * @param  {String} selector
 * @return {Node}
 */
_.parents = function(elem, selector) {
	let parents = [];
	let firstChar;
	if ( selector ) {
	   firstChar = selector.charAt(0);
	}

	// Get matches
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
	   if ( selector ) {

		   // If selector is a class
		   if ( firstChar === '.' ) {
			   if ( elem.classList.contains( selector.substr(1) ) ) {
				   parents.push( elem );
			   }
		   }

		   // If selector is an ID
		   if ( firstChar === '#' ) {
			   if ( elem.id === selector.substr(1) ) {
				   parents.push( elem );
			   }
		   }

		   // If selector is a data attribute
		   if ( firstChar === '[' ) {
			   if ( elem.hasAttribute( selector.substr(1, selector.length - 1) ) ) {
				   parents.push( elem );
			   }
		   }

		   // If selector is a tag
		   if ( elem.tagName.toLowerCase() === selector ) {
			   parents.push( elem );
		   }

	   } else {
		   parents.push( elem );
	   }

	}

	// Return parents if any exist
	if ( parents.length === 0 ) {
	   return null;
	} else {
	   return parents;
	}

};