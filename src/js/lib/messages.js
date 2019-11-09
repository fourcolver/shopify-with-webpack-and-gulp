/**
* messages
* @requires [lib/util.js]
*/
/**
* namespace
* @type {Object}
*/
SDG.Messages = SDG.Messages || {};

/**
* config
* @type {Object}
*/
SDG.Messages.config = {
	animation: {
		type: 'slideDown'
	}, // slideDown or fadeIn
	cls: {
		show: 'is-visible'
	},
	id: null,
	dom: {
		error: 'message--error',
		msg: 'message',
		success: 'message--success'
	},
	msgs: {
		error: '<p>Failed.</p>',
		success: '<p>Success!</p>'
	},
	timer: {
		hide: 200,
		show: 200
	}
};

/**
* @param  {Object} opts extend config option
* @return {Function}
*/
SDG.Messages.init = function(opts) {
	let c = JSON.parse(JSON.stringify(SDG.Messages.config));
	c = _.extend(c, opts);

	// cached globals
	const isString = typeof c.id === 'string';
	const domMsgs = isString ? document.getElementById(c.id) : c.id;

	/**
	* show success
	* @param  {String} val custom message value
	*/
	function showSuccess(val) {
		if (domMsgs) {
			let msg = c.msgs.success;

			if (val) {
				msg = val;
			}

			const html = `<div class="${c.dom.msg} ${c.dom.success}">${msg}</div>`;

			domMsgs.innerHTML = html;

			if (c.animation.type === 'slideDown') {
				_.slideDown(domMsgs, c.timer.show);
			} else {
				_.show(domMsgs);
				setTimeout(() => {
					_.addClass(domMsgs, c.cls.show);
				}, 1);
			}

		} else {
			console.log('No message block was found.');
		}
	}

	/**
	* show error
	* @param  {String} val custom message value
	*/
	function showError(val) {

		if (domMsgs) {
			let msg = c.msgs.error;

			if (val) {
				msg = val;
			}

			const html = `<div class="${c.dom.msg} ${c.dom.error}">${msg}</div>`;

			domMsgs.innerHTML = html;

			_.slideDown(domMsgs, c.timer.show);

		} else {
			console.log('No message block was found.');
		}
	}

	function clearMessages() {
		_.slideUp(domMsgs, c.timer.hide);

		_.transition({
			after: domMsgs.empty,
			time: c.timer.hide
		});
	}

	return {
		clear: clearMessages,
		error: showError,
		success: showSuccess
	};

};