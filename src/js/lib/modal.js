/**
* modal
* @requires [lib/util.js]
*
* namespace
* config
* init
*/

/**
* namespace
* @type {Object}
*/
SDG.Modal = SDG.Modal || {};

/**
* config
* @type {Object}
*/
SDG.Modal.config = {
	/**
	* autoshow
	*/
	autoshow: false, // Auto show modal on page load.
	autoshow_delay: 250, // Delay before executing auto show

	/**
	* callback
	*/
	cb: {
		after_close: null, // Callback to be initialized after close is complete
		after_open: null, // Callback to be initialized after open is complete
		before_close: null, // Callback to be initialized before close is complete
		before_open: null // Callback to be initialized before open is complete
	},

	cls: {
		close_btn: 'js-modal-close',
		modal_class: 'js-modal', // Class of the modal
		overflow: 'overflow-hidden',
		visible: 'is-visible',
	},

	/**
	* dom vars
	*/
	dom: {
		modal_id: 'modal', // Id of modal
		trigger: 'modalTrigger', // Id of the trigger to show the modal.
	},

	/**
	* Timer
	*/
	timer: {
		close: null, // Delay for close animation
		default: 250, // Default delay
		open: null // Delay for open animation
	}
};

/**
* init
* @param  {Object} opts Can be used to overwrite default config object
* @return {Object}
*/
SDG.Modal.init = function(opts) {
	/**
	* config object
	* @type {Object}
	*/
	const c = _.extend(SDG.Modal.config, opts);

	/**
	* cached elements
	*/
	const modal = document.getElementById(c.dom.modal_id);
	const overlay = modal ? modal.nextElementSibling : null;

	/**
	* init
	* @return {function} add events and check for autoshow
	*/
	function init() {
		if (modal) {
			addEvents();
			mapTimers();

			if (c.autoshow) {
				setTimeout(() => {
					openModal(modal);
				}, c.autoshow_delay);
			}
		}
	}

	/**
	* add events
	* @description executes all event functions
	*/
	function addEvents() {
		openEvent();
		closeEvent();
		kbEvent();
		callbacks();
	}

	/**
	* map timers
	* @description setting close timer and open timer if they are not set
	*/
	function mapTimers() {
		if (c.timer.close === null) c.timer.close = c.timer.default;
		if (c.timer.open === null) c.timer.open = c.timer.default;
	}

	/**
	* open event
	* @description add event listener top open modal
	*/
	function openEvent() {
		if (c.dom.trigger) {
			_.addEvent({
				id: c.dom.trigger,
				event: 'click',
				fn: openModal
			});
		}
	}

	/**
	* close event
	* @description add event listener to close modal
	*/
	function closeEvent() {
		_.addEvent({
			id: c.dom.modal_id,
			className: c.cls.close_btn,
			event: 'click',
			fn: closeModal
		});
	}

	/**
	* keyboard event
	* @description add key board event on keyup
	*/
	function kbEvent() {
		document.addEventListener('keyup', getKey);
	}

	/**
	* get key pressed
	* @description function that's executed on keypress. checks the keycode value,
	* if it matches with the escape key close all modals.
	*/
	function getKey(e) {
		if (e.keyCode === 27) {
			closeModal();
		}
	}

	/**
	* open modal
	* @param {string | domElement} - Can be the id string of the element,
	* or the selected element in the dom. If neither is set the modal associated
	* with the bound trigger event will display.
	*/
	function openModal(el) {

		let toOpen;
		let toOpenOverlay;

		if (el && typeof el === 'string') {
			toOpen = document.getElementById(el);
			toOpenOverlay = toOpen.nextElementSibling;
		} else {
			toOpen = modal;
			toOpenOverlay = overlay;
		}

		if (toOpen) {
			_.addClass(document.body, c.cls.overflow);
			_.addClass(toOpen, c.cls.visible);
			_.addClass(toOpenOverlay, c.cls.visible);

			// Trigger Callbacks before the modal opens
			_.trigger(modal, 'beforeOpenCb');

			setTimeout(() => {
				_.trigger(modal, 'afterOpenCb');
			}, c.timer.open);
		}
	}

	/**
	* close modal
	* @param {string | domElement} - Can be the id string of the element,
	* or the selected element in the dom. If neither is set all registered modals
	* on the page will close
	*/

	// With Callback
	function closeModal(el) {
		let toClose;
		let toCloseOverlay;

		if (el && typeof el === 'string') {
			toClose = document.getElementById(el);
			toCloseOverlay = toClose.nextElementSibling;
		} else {
			toClose = modal;
			toCloseOverlay = overlay;
		}

		if (toClose) {

			_.removeClass(document.body, c.cls.overflow);
			_.removeClass(modal, c.cls.visible);
			_.removeClass(toCloseOverlay, c.cls.visible);

			// Trigger callbacks before modal closes
			_.trigger(modal, 'beforeCloseCb');

			setTimeout(() => {
				_.trigger(modal, 'afterCloseCb');
			}, c.timer.close);
		}
	}

	// Without callback
	function closeModalNoCb(el) {
		let toClose;
		let toCloseOverlay;

		if (el && typeof el === 'string') {
			toClose = document.getElementById(el);
			toCloseOverlay = toClose.nextElementSibling;
		} else {
			toClose = modal;
			toCloseOverlay = overlay;
		}

		if (toClose) {
			_.removeClass(document.body, c.cls.overflow);
			_.removeClass(modal, c.cls.visible);
			_.removeClass(toCloseOverlay, c.cls.visible);
		}
	}

	/**
	* callbacks
	* @type {function}
	*/
	function callbacks() {
		_.addEvent({
			id: c.dom.modal_id,
			event: 'afterOpenCb',
			fn: () => {
				if (c.cb.after_open !== null) {
					c.cb.after_open();
				}
				return undefined;
			}
		});

		_.addEvent({
			id: c.dom.modal_id,
			event: 'afterCloseCb',
			fn: () => {
				if (c.cb.after_close !== null) {
					c.cb.after_close();
				}
				return undefined;
			}
		});

		_.addEvent({
			id: c.dom.modal_id,
			event: 'beforeOpenCb',
			fn: () => {
				if (c.cb.before_open !== null) {
					c.cb.before_open();
				}
				return undefined;
			}
		});

		_.addEvent({
			id: c.dom.modal_id,
			event: 'beforeCloseCb',
			fn: () => {
				if (c.cb.before_close !== null) {
					c.cb.before_close();
				}
				return undefined;
			}
		});
	}

	/**
	* return
	* @type {Object}
	*/
	return {
		init,
		open: openModal,
		close: closeModal,
		close_no_callback: closeModalNoCb
	};
};