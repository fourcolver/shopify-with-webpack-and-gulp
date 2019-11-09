/**
 * newsletter inline
 * @requires [lib/util.js,lib/modal.js,lib/cookie.js,lib/newsletter.js]
 */
/**
 * config
 * @type {Object}
 */
SDG.Newsletter.config = SDG.Newsletter.config || {};
SDG.Newsletter.banner_config = {
	cls: {
		active: 'is-active',
		banner_open: 'is-newsletter-banner-open',
		error: 'has-error',
		open: 'is-open'
	},
	exposed_cookie: {
		exdays: 1000,
		name: 'newsletter_banner_exposed',
		state_set: 'true',
		state_not_set: 'false',
	},
	hide_form_on_success: true,
	hide_messages_on_success: false,
	id: {
		accordion_btn: 'bannerNewsletterBtnToggle',
		accordion_menu: 'bannerNewsletterFormWrap',
		banner: 'bannerNewsletter',
		form: 'bannerNewsletterForm',
		page_wrap: 'main'
	},
	message_opts: {
		animation: {
			type: 'fadeIn'
		}
	},
	timer: {
		close_accordion_delay: 5000,
		refresh_accordion_delay: 100
	},
	transform_page_wrap: false
};

// Extend config object defined in lib/newsletter.js
SDG.Newsletter.config = _.extend(SDG.Newsletter.config, SDG.Newsletter.banner_config);

/**
 * banner
 * @param {Object} - Extend options object
 */
SDG.Newsletter.banner = function(opts) {

	// config
	const c = _.extend(SDG.Newsletter.config, opts);

	// modules
	const accordion = SDG.accordion({
		cb: {
			close: onAccordionClose,
			open: onAccordionOpen,
			refresh: onAccordionRefresh
		},
		dom: {
			id: c.id.banner
		},
		scroll: {
			scope: ''
		}
	});

	// state
	const state = {
		is_banner_open: false
	};

	// cached globals
	const $accordionBtn = document.getElementById(c.id.accordion_btn);
	const $accordionMenu = document.getElementById(c.id.accordion_menu);
	const $banner = document.getElementById(c.id.banner);
	const $form = document.getElementById(c.id.form);
	const $pageWrap = document.getElementById(c.id.page_wrap);
	const isExposedCookieSet = SDG.getCookie(c.exposed_cookie.name) === c.exposed_cookie.state_set;
	let	view;

	/**
	 * init
	 */
	function init() {

		// add events
		addEvents();

		// add callbacks
		addCallbacks();

		// init form
		SDG.Newsletter.form(c);

		// init accordion
		accordion.init();

		// check cookie
		checkCookie();
	}

	/**
	 * add events
	 */
	function addEvents() {

		// window resize
		if (c.transform_page_wrap) {
			_.windowResize(onWindowResize);
		}
	}

	/**
	 * add callbacks
	 */
	function addCallbacks() {

		// form error
		_.addEvent({
			id: $banner,
			event: 'onFormError',
			fn: onFormError
		});

		// form success
		_.addEvent({
			id: $banner,
			event: 'onFormSuccess',
			fn: onFormSuccess
		});
	}

	/**
	 * check cookie
	 */
	function checkCookie() {

		// only open accordion when newsletter exposed cookie is set
		if (!isExposedCookieSet) return;

		// open accordion
		openAccordion();
	}

	/**
	 * on form error
	 */
	function onFormError() {

		// add error class to form
		_.addClass($form, c.cls.error);

		// refresh accordion
		setTimeout(accordion.refresh, c.timer.refresh_accordion_delay);
	}

	/**
	 * on form success
	 */
	function onFormSuccess() {

		// refresh accordion
		setTimeout(accordion.refresh, c.timer.refresh_accordion_delay);

		// close accordion
		setTimeout(closeAccordion, c.timer.close_accordion_delay);
	}

	/**
	 * on accordion open
	 */
	function onAccordionOpen() {

		// set flag
		state.is_banner_open = true;

		// transform page wrap
		if (c.transform_page_wrap) {
			transformPageWrap();
		}

		// set newsletter exposed cookie to 'true'
		setCookie(c.exposed_cookie.state_set);
	}

	/**
	 * on accordion close
	 */
	function onAccordionClose() {

		// set flag
		state.is_banner_open = false;

		// remove transform from page wrap
		if (c.transform_page_wrap) {
			resetPageWrap();
		}

		// set newsletter exposed cookie to 'false'
		setCookie(c.exposed_cookie.state_not_set);
	}

	/**
	 * on accordion refresh
	 */
	function onAccordionRefresh() {

		// transform page wrap
		if (c.transform_page_wrap) {
			transformPageWrap();
		}
	}

	/**
	 * on window resize
	 */
	function onWindowResize() {

		// only execute function if banner is open
		if (!state.is_banner_open) return;

		// mobile
		// transform page wrap
		_.mq({
			callback() {
				transformPageWrap();
				view = this.view;
			},
			view: 'mobile'
		});

		// desktop
		// reset page wrap
		_.mq({
			callback() {
				if (view !== this.view) {
					resetPageWrap();
					view = this.view;
				}
			},
			view: 'desktop'
		});
	}

	/**
	 * transform page wrap
	 */
	function transformPageWrap() {
		const accordionMenuStyles = _.getHiddenStyles($accordionMenu);
		const accordionMenuHeight = `${accordionMenuStyles.elHeight}px`;

		// edit page wrap styles
		$pageWrap.style.transform = `translate3d(0, ${accordionMenuHeight}, 0)`;
		$pageWrap.style.marginBottom = accordionMenuHeight;
	}

	/**
	 * reset page wrap
	 */
	function resetPageWrap() {

		// remove inline page wrap styles
		$pageWrap.style.removeProperty('transform');
		$pageWrap.style.removeProperty('margin-bottom');
	}

	/**
	 * open accordion
	 */
	function openAccordion() {
		accordion.open($accordionMenu);
		_.addClass($accordionBtn, c.cls.active);
	}

	/**
	 * close accordion
	 */
	function closeAccordion() {
		accordion.close($accordionMenu);
		_.removeClass($accordionBtn, c.cls.active);
		_.removeClass($accordionMenu, c.cls.open);
	}

	/**
	 * set cookie
	 * @param {string} state cookie state
	 */
	function setCookie(cookieState) {
		SDG.setCookie(c.exposed_cookie.name, cookieState, c.exposed_cookie.exdays);
	}

	return init();
};