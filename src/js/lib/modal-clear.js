/**
 * namespace
 * @type {Object}
 */
SDG.Modal = SDG.Modal || {};

/**
 * clear modal html
 * @type {Function}
 */
SDG.Modal.clear = function(opts) {
	const config = {
		modal: null,
		overlay: null
	};
	const c = _.extend(config, opts);

	// cached globals
	const modal = document.getElementById(c.modal);
	const overlay = document.getElementById(c.overlay);

	function init() {
		if (opts !== undefined) {
			modal.remove();
			overlay.remove();
		}
	}

	return init();
};