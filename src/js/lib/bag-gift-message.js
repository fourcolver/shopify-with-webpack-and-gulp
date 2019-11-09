/**
 * gift message
 * @requires [lib/util.js,lib/bag-config.js]
 * namespace
 * bag config
 */

/**
 * namespace
 * @type {Object}
 */
SDG.Bag = SDG.Bag || {};
/**
* bag config
* @type {Object}
*/
SDG.Bag.config = SDG.Bag.config || {};

/**
* Gift Message config
* @type {Object}
*/
SDG.Bag.gift_message = {
	dom: {
		giftMessage: 'giftMessage',
		giftMessageLabel: 'giftMessageLabel',
		giftMessageCheckbox: 'giftMessageCheckbox',
		giftMessageTextarea: 'giftMessageTextarea',
		giftMessageTextWrapper: 'giftMessageTextWrapper',
		keepShoppingBtn: 'closeMiniCart',
		checkoutBtn: 'checkoutBtn'
	},
	keydown: 'keydown'
};


/**
  * extend bag config
  * @type {Object}
  */
SDG.Bag.config = _.extend(SDG.Bag.config, SDG.Bag.gift_message);

/**
 * gift message
 */
SDG.Bag.giftMessage = function(opts) {

	const c = _.extend(SDG.Bag.config, opts);
	const $giftMessage = document.getElementById(c.dom.giftMessage);
	const $giftMessageCb = document.getElementById(c.dom.giftMessageCheckbox);
	const $textarea = document.getElementById(c.dom.giftMessageTextarea);
	const $textWrapper = document.getElementById(c.dom.giftMessageTextWrapper);
	const $bag = document.getElementById(c.dom.bag);
	const placeholder = SDG.placeholder({
		id: c.dom.giftMessage
	});

	function init() {
		addEvent();

		if (_.hasClass($bag, c.cls.empty)) {
			_.removeClass($giftMessage, c.cls.active);
		} else {
			_.addClass($giftMessage, c.cls.active);
		}

		if (sessionStorage.getItem('giftMessageCb') === 'checked') {
			$giftMessageCb.checked = true;
			_.addClass($textWrapper, c.cls.active);
			// putMessage();
		}
		placeholder.init();

	}

	function addEvent() {

		_.addEvent({
			id: c.dom.giftMessageCheckbox,
			event: 'click',
			fn: giftMessageCheckbox
		});

		_.addEvent({
			id: c.dom.giftMessageTextarea,
			event: c.keydown,
			fn: countWords
		});

		_.addEvent({
			id: c.dom.keepShoppingBtn,
			event: 'click',
			fn: keepMessage
		});

		_.addEvent({
			id: c.dom.checkoutBtn,
			event: 'click',
			fn: deleteMessage
		});

	}

	function keepMessage() {
		const text = $textarea.value;
		sessionStorage.setItem('giftMessageCb', 'checked');
		storeMessage(text);
	}

	function giftMessageCheckbox() {

		if (this.checked) {
			_.addClass($textWrapper, c.cls.active);
			sessionStorage.setItem('giftMessageCb', 'checked');
			$textarea.focus();
			storeMessage($textarea.value);

		} else {
			_.removeClass($textWrapper, c.cls.active);
			deleteMessage();
			$textarea.value = '';
			sessionStorage.removeItem('giftMessageCb');
		}
	}

	/*
	function emptyMessage() {
		$textarea.value = '';
		deleteMessage();
	}
	*/

	function countWords(e) {
		const wordLimit = 1000;
		const text = $textarea.value;

		if (text.length > wordLimit) {
			$textarea.value = $textarea.value.slice(0, -1);
		}

		if (e.keyCode === 13 && !e.shiftKey) {
			// prevent enter key
			e.preventDefault();
		}
	}

	function storeMessage(message) {
		sessionStorage.setItem('giftMessage', message);
	}

	function deleteMessage() {
		sessionStorage.removeItem('giftMessageCb');
		sessionStorage.removeItem('giftMessage');
	}

	// function putMessage() {
	// 	const message = sessionStorage.getItem('giftMessage');
	// 	$textarea.value = message;
	// }

	return init();
};