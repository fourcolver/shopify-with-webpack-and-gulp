/**
* sweepstakes
*
* import dependencies
* fire functions
*/

/**
* import dependencies
*/
import validate from '../plugins/validate';

/**
*
* namespace
* run
* fire functions
*/

/**
* Sweepstakes namespace
* @type {Object}
*/
SDG.Sweepstakes = SDG.Sweepstakes || {};

SDG.Sweepstakes.config = {
	modal: {
		id: 'modalSweep',
		trigger: 'modalSweepTrigger',
		overlay: 'modalSweepOverlay'
	}
};

SDG.Sweepstakes.run = function(opts) {
	const c = _.extend(SDG.Sweepstakes.config, opts);
	// Sweepstakes modal
	const modalOpts = {
		dom: {
			modal_id: c.modal.id,
			overlay: c.modal.overlay,
			trigger: c.modal.trigger
		}
	};
	const modalSweep = SDG.Modal.init(modalOpts);
	const placeholder = SDG.placeholder({
		id: 'form302'
	});

	function init() {
		const hash = window.location.hash.substring(1);
		if (window.location.hash) {

			if (hash === 'thanks') {
				document.getElementById('formWrap').style.display = 'none';
				document.getElementById('formThanks').style.display = 'block';
			}
		}

		// modal init
		modalSweep.init();

		// placeholder init
		placeholder.init();

		// validate init
		validate.init();
	}

	return init();
};

SDG.Sweepstakes.run();