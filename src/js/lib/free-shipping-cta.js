/**
 * free shipping cta
 *
 * import dependencies
 * namespace
 * free shipping cta
 */

/**
 * import dependencies
 */
import '../../../node_modules/confetti-js/dist/index.min';

/**
 * namespace
 */
SDG.Confetti = SDG.Confetti || {};

SDG.Confetti.Bag = SDG.Confetti.Bag || {};

SDG.Confetti.timeout = null;

SDG.Confetti.clearTimeout = function() {
	if (SDG.Confetti.timeout) {
		clearTimeout(SDG.Confetti.timeout);
	}
};

SDG.Confetti.timesRendered = 0;

// notes for when confetti should run:
// not on page load
// only when the mini cart is open
// only on the first instance of above free shipping value

/**
 * free shipping cta
 * @param  {Object} opts
 * @return {Object}
 */
SDG.freeShippingCta = function(opts) {
	const config = {
		cls: {
			hidden: 'is-hidden',
		},
		id: {
			bag_confetti: 'bagConfetti',
			free_shipping_msg: 'freeShippingMsg',
			free_shipping_msg_success: 'freeShippingMsgSuccess',
			free_shipping_val: 'freeShippingVal'
		},
		timer: {
			confetti: 3000,
			normal: 400,
		},
	};
	const c = _.extend(config, opts);

	// cached globals
	const enable = themeSettings.freeShipping.enable;
	const msg = themeSettings.freeShipping.message;
	const val = themeSettings.freeShipping.value;
	const $msg = document.getElementById(c.id.free_shipping_msg);
	const $msgSuccess = document.getElementById(c.id.free_shipping_msg_success);
	const $bagConfetti = document.getElementById(c.id.bag_confetti);
	const shouldExitFn = !enable || !msg || !val || !$msg;

	/**
	 * init
	 */
	function init() {

		if (shouldExitFn) return;

		// continue
		initConfetti();
	}

	/**
	 * init confetti
	 */
	function initConfetti() {

		// init confetti
		SDG.Confetti.Bag = new window.ConfettiGenerator({
			target: c.id.bag_confetti,
			clock: 60,
			max: 100,
			size: 2,
			colors: [[151, 202, 235], [226, 185, 214], [101, 178, 232], [223, 75, 154]]
		});
	}

	/**
	 * render confetti
	 */
	function renderConfetti() {
		const noBagInstances = !SDG.Bag.isOpen && !SDG.Bag.isOpening;

		// if bag isn't open, and it isn't opening (it can show while opening),
		// or if confetti has already rendered, exit function
		if (noBagInstances || SDG.Confetti.timesRendered > 0) return;

		// ensure that the hidden class is removed
		_.removeClass($bagConfetti, c.cls.hidden);

		// clear timeout
		SDG.Confetti.clearTimeout();

		// render confetti
		SDG.Confetti.Bag.render();

		// set timeout
		SDG.Confetti.timeout = setTimeout(clearConfetti, c.timer.confetti);
	}

	/**
	 * clear confetti
	 */
	function clearConfetti() {

		// clear timeout
		SDG.Confetti.clearTimeout();

		// add hidden class
		_.addClass($bagConfetti, c.cls.hidden);

		// clear confetti
		setTimeout(SDG.Confetti.Bag.clear, c.timer.normal);
	}

	/**
	 * increment confetti render count
	 */
	function incrementConfettiRenderCount() {

		// increment render count
		SDG.Confetti.timesRendered += 1;
	}

	/**
	 * reset confetti render count
	 */
	function resetConfettiRenderCount() {

		// reset render count
		SDG.Confetti.timesRendered = 0;
	}

	/**
	 * update value
	 * @param {number} subtotal
	 */
	function updateValue(subtotal) {
		let difference = '';
		let hasDifference = '';
		const $val = document.getElementById(c.id.free_shipping_val);

		if (shouldExitFn || typeof subtotal === 'undefined') return;

		// calculate difference (free shipping value - subtotal)
		difference = val - subtotal;
		hasDifference = difference > 0;

		// if difference is > 0,
		// update value in string and show message,
		// else hide message, and show success
		if (hasDifference) {
			$val.innerHTML = difference;
			_.show($msg);
			_.hide($msgSuccess);
			clearConfetti();
			resetConfettiRenderCount();
		} else {
			_.hide($msg);
			_.show($msgSuccess);
			renderConfetti();
			incrementConfettiRenderCount();
		}
	}

	/**
	 * Return
	 * @type {Object}
	 */
	return {
		init,
		updateValue
	};
};
