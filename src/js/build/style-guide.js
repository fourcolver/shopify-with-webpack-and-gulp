/**
 * Style Guide
 *
 * namespace
 * run dom ready
 * fire functions
 */

/**
 * namespace
 * @type {Object}
 */
SDG.StyleGuide = SDG.StyleGuide || {};

/**
 * run dom ready
 * @type {Function}
 */
SDG.StyleGuide.run = function() {
	const accordion = SDG.accordion();
	const modalSampleOpts = {
		dom: {
			modal_id: 'modalSample',
			overlay: 'modalSampleOverlay',
			trigger: 'modalSampleTrigger'
		}
	};
	const modalSample = SDG.Modal.init(modalSampleOpts);
	const placeholder = SDG.placeholder();
	const navDropdown = SDG.toggleDropdown;

	// accordion
	accordion.init();

	// modal
	modalSample.init();

	// input placeholders
	placeholder.init();

	navDropdown();
};

/**
 * fire functions
 */
// SDG.StyleGuide.run();