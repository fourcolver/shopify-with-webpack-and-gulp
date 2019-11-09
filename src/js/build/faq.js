/**
 * FAQ
 *
 * import dependencies
 * namespace
 * run dom ready
 * fire functions
 */

/**
 * import dependencies
 */
import '../lib/sticky';

/**
 * namespace
 * @type {Object}
 */
SDG.FAQ = SDG.FAQ || {};

/**
 * run dom ready
 * @type {Function}
 */
SDG.FAQ.run = function() {
	const accordion = SDG.accordion({
		dom: {
			id: 'faqAccordion',
		},
		scroll: {
			scope: false,
		},
		responsive: true,
		views: {
			active: ['phone', 'tablet'],
			inactive: ['desktop'],
		}
	});
	const stickySidebar = SDG.sticky({
		fixed_header: true,
		offset_bottom: 99,
		offset_top: 50,
	});

	// accordion
	accordion.init();

	// sticky sidebar
	stickySidebar.init();
};

/**
 * fire functions
 */
SDG.FAQ.run();