/**
 * media query
 * @param {object} argument object
 * @param {string} object.view - the targetted screen size to execute the function
 * @param {fn} oject.callback - function to execute
 * @param {object} oject.views - array of available views that can be targetted
 */
_.mq = function(opts) {
	let config = {
			callback : null,
			view	: null,
			views : {
				smallest_phone			: '(max-width:374px)',
				small_phone 			: '(max-width:640px)',
				phone 					: '(max-width:767px)',
				mobile					: '(max-width:1024px)',
				phone_to_desktop		: '(min-width:563px)',
				tablet					: '(min-width:768px)',
				tablet_only 			: '(min-width:768px) and (max-width:1024px)',
				tablet_portrait 		: '(min-width:768px) and (max-width:979px)',
				tablet_landscape 		: '(min-width:980px) and (max-width:1024px)',
				desktop					: '(min-width:1025px)',
				desktop_to_large    	: '(min-width:1025px) and (max-width:1280px)',
				desktop_large			: '(min-width:1281px)',
				desktop_large_to_huge 	: '(min-width:1281px) and (max-width:1400px)',
				desktop_huge			: '(min-width:1401px)'
			}
		},

		c = _.extend(config,opts),

		currentView = null,

		mq = {
			init : function() {

				if (c.view) {

					Object.keys(c.views).forEach(function(key) {
						if (key === c.view) {
							currentView = c.views[key];
						}
					});

					let query = window.matchMedia(currentView);

					if (query.matches === true) {
						if (typeof c.callback === 'function') {
							c.callback();
						}
					}

				}

			}
		};

	return mq.init();
};