/**
 * scripts
 */

import $script from '../plugins/scripts';

(function() {
	const count = SDG.sq.length;

	// page js
	if (pageHandle in path) {
		$script([path[pageHandle]]);
	}

	// partials js
	if (count) {
		SDG.sq.forEach((file) => {
			$script([file]);
		});
	}
}());