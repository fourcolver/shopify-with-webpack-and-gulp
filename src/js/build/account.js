/**
* Account
*
* namespace
* config
* run
* login
* fire functions
*/

/**
* Account namespace
* @type {Object}
*/
SDG.Account = SDG.Account || {};
/**
* config
* @type {Object}
*/
SDG.Account.config = {

	// elements
	el: {
		login: document.getElementById('acLogin')
	},

	// ids
	id: {
		hideRecoverPassword: 'hideRecoverPasswordBtn',
		recoverPassword: 'recoverPassword',
		sectionLogin: 'acLoginForm',
		sectionRecoverPassword: 'acRecoverPasswordForm'
	},

	// urls (hashes)
	url: {
		recover: '#recover'
	}
};

/**
* run
* @type {Function}
*/
SDG.Account.run = function() {
	const c = SDG.Account.config;
	const placeholder = SDG.placeholder();

	// login
	if (c.el.login) {
		SDG.Account.login();
	}

	// placeholder
	placeholder.init();
};

/**
* login
* @return {SDG.Account.login~init}
*/
SDG.Account.login = function() {
	const c = SDG.Account.config;

	// globals
	const sectionLogin = document.getElementById(c.id.sectionLogin);
	const sectionRecoverPassword = document.getElementById(c.id.sectionRecoverPassword);

	/**
	* init
	*/
	function init() {
		detectRecover();
		addEvents();
	}

	/**
	* add events
	*/
	function addEvents() {

		// forgot password click
		_.addEvent({
			id: c.id.recoverPassword,
			event: 'click',
			fn: showRecoverPasswordForm
		});

		// go back click
		_.addEvent({
			id: c.id.hideRecoverPassword,
			event: 'click',
			fn: hideRecoverPasswordForm
		});
	}

	/**
	* show recover password form
	*/
	function showRecoverPasswordForm() {
		sectionLogin.style.display = 'none';
		sectionRecoverPassword.style.display = 'block';
	}

	/**
	* hide recover password form
	*/
	function hideRecoverPasswordForm() {
		sectionRecoverPassword.style.display = 'none';
		sectionLogin.style.display = 'block';
	}

	/**
	* detect recover
	*/
	function detectRecover() {
		if (window.location.hash === c.url.recover) {
			showRecoverPasswordForm();
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

/**
* fire functions
*/
SDG.Account.run();
