/**
 * bag empty
 */
SDG.Bag.empty = function(empty) {
	const c = SDG.Bag.config;

	// cached globals
	const $bag = document.getElementById(c.dom.bag);

	if (empty) {
		_.addClass($bag, c.cls.empty);
	} else {
		_.removeClass($bag, c.cls.empty);
	}
};