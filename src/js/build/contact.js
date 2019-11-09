/**
 * contact
 *
 * import dependencies
 * fire functions
 */

/**
 * import dependencies
 */
import validate from '../plugins/validate';

/**
 * fire functions
 */
(function() {
	// const placeholder = SDG.placeholder({
	// 	id: 'form297'
	// });

	// placeholder
	//placeholder.init();

	// show thanks message
	if (window.location.hash) {
		const hash = window.location.hash.substring(1);

		if (hash === 'thanks') {
			document.getElementById('formResponse').style.display = 'block';
		}
	}

	// validation
	validate.init();
}());
