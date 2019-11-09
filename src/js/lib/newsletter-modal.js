/**
* newsletter modal
* @requires [lib/util.js,lib/modal.js,lib/cookie.js,lib/newsletter.js]
*
* config
* modal
*/

/**
* config
* @type {Object}
*/
SDG.Newsletter.config = SDG.Newsletter.config || {};
SDG.Newsletter.modal_config = {
	autoshow: true,
	cb: {
		after_close: null,
		after_open: null,
		before_close: null,
		before_open: null
	},
	cls: {
		hide_modal: 'hide-modal',
		overflow: 'overflow-visible'
	},
	cookie: {
		exdays: 1000,
		name: 'newsletter',
		state: 'set'
	},
	dom: {
		modal_id: 'newsletterModal'
	},
	el: {
		body: document.getElementsByTagName('body')[0]
	},
	id: {
		welcome: 'welcomeNewsletter'
	},
	hide_form_on_success: true,
	hide_messages_on_success: false,
	hide_on_bottom: true,
	hide_on_bottom_offset: 90,
	message_opts: {
		animation: {
			type: 'fadeIn'
		}
	},
	timer: {
		close_modal: 5000
	}
};

// Extend config object defined in lib/newsletter.js
SDG.Newsletter.config = _.extend(SDG.Newsletter.config, SDG.Newsletter.modal_config);

/**
* modal
* @param  {Object} - Extend options object
* @return {SDG.Newsletter.modal~init}
*/
SDG.Newsletter.modal = function(opts) {
	let c = _.extend(SDG.Newsletter.config, opts);
	let modalOpened = false;
	let modal;
	let activeView;

	const $welcomeNewsletter = document.getElementById(c.id.welcome);


	/**
	 * init
	 */
	function init() {
		responsive();
		_.windowResize(responsive);
	}

	/**
	 * check cookie
	 */
	function checkCookie() {
		if (SDG.getCookie(c.cookie.name) !== c.cookie.state) {

			if (modalOpened) {
				modal.open(c.dom.modal);
			} else {
				modalOpened = true;
				bindFunctions();
			}
		}
	}

	/**
	 * bind functions
	 */
	function bindFunctions() {
		addCallbacks();
		SDG.Newsletter.form(c);
		registerModal();
		modal.init();
		modal.open(c.dom.modal);
		hideModalBottomPage(c.hide_on_bottom);
	}

	/**
	 * add callbacks
	 */
	function addCallbacks() {

		// form success
		_.addEvent({
			id: $welcomeNewsletter,
			event: 'onFormSuccess',
			fn: onFormSuccess
		});
	}

	/**
	 * on form success
	 */
	function onFormSuccess() {

		// close modal
		closeModal();
	}

	/**
	 * register modal
	 */
	function registerModal() {
		const cbIsFunction = typeof c.cb.after_close === 'function';
		const modalConfig = {
			cb: {
				after_close() {
					if (cbIsFunction) {
						c.cb.after_close();
					}
					SDG.setCookie(c.cookie.name, c.cookie.state, c.cookie.exdays);
				}
			}
		};

		c = _.extend(c, modalConfig);

		modal = SDG.Modal.init(c);
	}

	/**
	 * close modal
	 */
	function closeModal() {
		if (modal) {
			setTimeout(() => {
				modal.close(c.dom.modal);
			}, c.timer.close_modal);
		}
	}

	/**
	 * close modal no callback
	 */
	function closeModalNoCb() {
		if (modal) {
			modal.close_no_callback(c.dom.modal);
		}
	}

	/**
	 * responsive
	 */
	function responsive() {

		// desktop
		_.mq({
			view: 'desktop',
			callback() {
				if (activeView !== this.view) {
					activeView = this.view;
					checkCookie();
				}
			}
		});

		// mobile
		_.mq({
			view: 'mobile',
			callback() {
				if (activeView !== this.view) {
					activeView = this.view;
					closeModalNoCb();
				}
			}
		});
	}

	/**
	* check element position
	*/
	function modalPosition() {
		const d = document.documentElement;
		const { body } = document;
		const offset = d.scrollTop + window.innerHeight;
		const offsetAdd = c.hide_on_bottom_offset;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, d.clientHeight, d.scrollHeight, d.offsetHeight); // eslint-disable-line
		const docHeightAdd = docHeight - offsetAdd;

		if (offset > docHeightAdd) {
			_.addClass(c.el.body, c.cls.hide_modal);
		} else {
			_.removeClass(c.el.body, c.cls.hide_modal);
		}
	}

	/**
	 * hide modal if bottom of the page
	 */
	function hideModalBottomPage(state) {
		if (state) {
			modalPosition();
			window.addEventListener('scroll', modalPosition, false);
		}
	}

	/**
	* return
	* @type {Object}
	*/
	return {
		init: init()
	};
};