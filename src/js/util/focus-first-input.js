/**
 * focuses on the first input in a container
 */
_.focusFirst = function(id,sel) {
	let $container = document.getElementById(id),
		inputSelector = sel ? sel : 'input',
		$inputs,
		$input,
		type,
		$first,
		count,
		i;

	if ($container) {
		$inputs = $container.querySelectorAll(inputSelector);
		count = $inputs.length;

		if ($inputs.length > 0) {

			for (i = 0; i < count; i++) {
				$input = $inputs[i];
				type = $input.getAttribute('type');

				if (type !== 'hidden') {

					$input.focus();

					break;
				}
			}
		}

	} else {
		console.warn('id doesn\'t exist');
	}
};