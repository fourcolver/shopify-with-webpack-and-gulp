/**
 * product stock notification
 *
 * namespace
 * run
 * run dom ready
 * fire functions
 */

/**
* product namespace
* @type {Object}
*/
SDG.Product = SDG.Product || {};

/**
* product config
* @type {Object}
*/
SDG.Product.config = SDG.Product.config || {};

/**
* gallery config
* @type {Object}
*/
SDG.Product.config_notify = {
	cls: {
		active: 'is-active',
		disabled: 'is-disabled',
		form: 'addToBag',
		loading: 'is-loading',
		showing_notify: 'is-notify'
	},
	dom: {
		notify: 'notifyConfig',
		notify_btn: '.js-notify-btn',
		notify_form: 'js-notify-form',
		notify_input: '.js-notify-email',
		notify_msg: 'notifyMessageConfig',
		add_to_bag: 'btnAddToBag'
	},
	sticky_details: false
};

/**
* extend product config
* @type {Object}
*/
SDG.Product.config = _.extend(SDG.Product.config, SDG.Product.config_notify);

/**
 * notify
 * @return {Object}
 */
function productNotify() {

	// config
	const c = SDG.Product.config;

	// cached globals
	const $notify = document.getElementById(c.dom.notify);
	const $btn = $notify.querySelector(c.dom.notify_btn);
	const $form = $notify.querySelector(`.${c.dom.notify_form}`);
	const $input = $notify.querySelector(c.dom.notify_input);
	let msgs;
	let stickyScroll;

	// sticky scroll
	if (c.sticky_details) {
		stickyScroll = SDG.ProductSticky.scroll();
	}

	function init() {

		_.addEvent({
			id: c.dom.notify,
			className: c.dom.notify_form,
			event: 'submit',
			fn: formSubmit
		});

		msgs = SDG.Messages.init({
			id: c.dom.notify_msg,
			dom: {
				msg: 'notify__message message'
			}
		});
	}

	function formSubmit(e) {

		e.preventDefault();

		const email = $input.value;
		const variantId = $form.getAttribute('data-variant-id');
		const prodId = $form.getAttribute('data-product-id');

		disableNotifyButton();
		BIS.create(email, variantId, prodId).then(notifyCallback);
	}

	function notifyCallback(data) {
		const msgArr = [];
		const { status } = data;
		let msg;

		if (status === 'Error') {
			const { errors } = data;
			Object.keys(errors).forEach((type) => {
				errors[type].forEach((error) => {
					msg = `<p class="error">${error}</p>`;
					msgArr.push(msg);
				});
			});
			msgs.error(msgArr);
		} else {
			msg = `<p class="success">${data.message}</p>`;
			msgs.success(msg);
		}

		enableNotifyButton();
	}

	function disableNotifyButton() {
		_.addClass($btn, c.cls.loading);
		$btn.disabled = true;
	}

	function enableNotifyButton() {
		_.removeClass($btn, c.cls.loading);
		$btn.disabled = false;
	}

	function clearNotifications() {
		if (msgs) {
			msgs.clear();
		}
	}

	function show(available, id) {
		if (available) {
			_.hide($notify);
			_.removeClass($notify, c.cls.showing_notify);

			if (stickyScroll) {
				stickyScroll.onNotifyHide();
			}
		} else {
			_.show($notify);
			$form.setAttribute('data-variant-id', id);
			_.addClass($notify, c.cls.showing_notify);

			if (stickyScroll) {
				stickyScroll.onNotifyShow();
			}
		}
	}

	return {
		init: init(),
		show,
		clear: clearNotifications
	};
}

export default productNotify;