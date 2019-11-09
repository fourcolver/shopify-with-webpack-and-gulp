/**
* newsletter
* @requires [lib/util.js,lib/messages.js,lib/modal.js,lib/cookie.js]
*/
/**
* namespace
* @type {Object}
*/
SDG.Newsletter = SDG.Newsletter || {};

/**
* config
* @type {Object}
*/
SDG.Newsletter.config = {
	cb: {
		form_success: null
	},
	cls: { // Toggle classes
		loading: 'is-loading',
		loading_color: 'is-loading--pink'
	},
	dom: {
		btn: 'newsletterSubmit', // id of the form submit button
		form: 'newsletterForm', // id of the form
		id: 'newsletter', // id of the  container
		input: 'newsletterInput', // id of the input
	},
	hide_form_on_success: false,
	hide_messages_on_focus: false,
	hide_messages_on_success: true,
	message_opts: {
		id: 'newsletterMessages',
		dom: {
			msg: 'message message--nobg newsletter__message'
		},
		msgs: {
			already_member: '<p>You\'re already a member.</p>',
			success: '<p>Thanks for subscribing!</p>'
		}
	},
	namespace: null, // Name space all dom and message id values
	placeholder: true,
	timer: {
		slide_up_delay: '3000'
	}
};

/**
* init
* @param  {Object} opts extend config option
* @return {Function}
*/
SDG.Newsletter.form = function(opts) {
	const c = _.extend(SDG.Newsletter.config, opts);

	/**
	* name space variables if set in config
	*/
	c.dom = _.namespace(c.dom, c.namespace);
	c.message_opts = _.namespace(c.message_opts, c.namespace);

	/**
	* cached globals
	*/
	const domId = document.getElementById(c.dom.id);
	const domForm = document.getElementById(c.dom.form);
	const domEmail = document.getElementById(c.dom.input);
	const domSubmit = document.getElementById(c.dom.btn);
	let msgs;
	let placeholder;

	/**
	* init
	* @type {Function}
	*/
	function init() {
		msgs = SDG.Messages.init(c.message_opts);
		addEvents();
		callbacks();
		if (c.placeholder) {
			placeholder = SDG.placeholder({
				id: c.dom.id
			});
			placeholder.init();
		}
	}

	/**
	* add events
	* @type {Function}
	*/
	function addEvents() {

		_.addEvent({
			id: c.dom.form,
			event: 'submit',
			fn: onSubmit
		});

		if (c.hide_messages_on_focus) {
			_.addEvent({
				id: c.dom.form,
				event: 'focus',
				fn: msgs.clear
			});
		}
	}

	/**
	* callbacks
	* @type {Function}
	*/
	/**
	* callbacks
	* @type {function}
	*/
	function callbacks() {

		_.addEvent({
			id: c.dom.id,
			event: 'formSuccess',
			fn: () => {

				if (typeof c.cb.form_success === 'function') {
					c.cb.form_success();
				}

				// hide form
				if (c.hide_form_on_success) {
					_.hide(domForm);
				}
			}
		});
	}

	/**
	* on submit
	*/
	function onSubmit(e) {
		e.preventDefault();

		const ajaxUrl = this.getAttribute('data-ajax-submit');
		const data = _.serialize(domForm, true);

		// disable button
		disableButton();

		// reset messages to their default (hidden) state
		msgs.clear();

		// blur email
		domEmail.blur();

		_.ajax({
			contentType: 'application/json',
			dataObject: JSON.stringify(data),
			error: onError,
			success: onSuccess,
			type: 'POST',
			url: ajaxUrl
		});
	}

	/**
	* form success
	* @type {Function}
	*/
	function onSuccess(response) {

		// enable button
		enableButton();

		// clear Inputs
		clearInputs();

		// show messages
		if (response.already_member) {
			msgs.success(c.message_opts.msgs.already_member);
		} else {
			msgs.success();
		}

		// trigger success callbacks
		if (domId) {
			_.trigger(domId, 'formSuccess');
		}

		// hide messages
		if (c.hide_messages_on_success) {
			setTimeout(msgs.clear, c.timer.slide_up_delay);
		}

		// custom success callback
		if (typeof c.cb.form_success === 'function') {
			c.cb.form_success();
		}
	}

	function onError(response) {
		let errorMsg = response.message ? response.message.split(/\x2a/g) : null;

		enableButton();

		if (errorMsg) {
			errorMsg = `<p>${errorMsg[errorMsg.length - 1]}</p>`;
			msgs.error(errorMsg);
		} else {
			msgs.error();
		}
	}

	/**
	* enable buttons
	*/
	function enableButton() {
		_.removeClass(domSubmit, c.cls.loading);
		_.removeClass(domSubmit, c.cls.loading_color);
		domSubmit.disabled = false;
	}

	/**
	* disable buttons
	*/
	function disableButton() {
		_.addClass(domSubmit, c.cls.loading);
		_.addClass(domSubmit, c.cls.loading_color);
		domSubmit.disabled = true;
	}

	/**
	* clear inputs
	*/
	function clearInputs() {

		// empty email input
		domEmail.value = '';

		// refresh placeholder
		if (c.placeholder) {
			placeholder.refresh();
		}
	}

	return init();
};