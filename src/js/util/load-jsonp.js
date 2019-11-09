/**
 * loadJSONP( url, hollaback [, context] ) -> Null
 * - url (String): URL to data resource.
 * - hollaback (Function): Function to call when data is successfully loaded,
 *   it receives one argument: the data.
 * - context (Object): Context to invoke the hollaback function in.
**/

_.loadJSONP = (function loadJSONP( window, document, undefined ) {
  	let uuid = 0,
		head = document.head || document.getElementsByTagName( 'head' )[0],
		main_script = document.createElement( 'script' );

  	main_script.type = 'text/javascript';

	return function( url, callback, context ) { let name, script;
	    // INIT
	    name = `__jsonp_${uuid++}`;
	    if ( url.match(/\?/) ) {
	      url += `&callback=${name}`;
	  	} else {
	      url += `?callback=${name}`;
	  	}

	    // Create script
	    script = main_script.cloneNode();
	    script.src = url;

	    // Setup handler
	    window[name] = function( data ) {
	      callback.call( ( context || window ), data );
	      head.removeChild( script );
	      script = null;
	      delete window[name];
	  	};

	    // Load JSON
	    head.appendChild( script );
	};
})( window, document );