/**
* incrementer
* @requires [lib/util.js]
*/
SDG.incrementer = function(opts) {
	const config = {
		action: {
			remove: 'remove',
			add: 'add'
		},
		cb: null,
		cls: {
			loading: 'is-loading'
		},
		dom: {
			btn: 'js-increment-btn',
			id: 'bagItems',
			increment: '.js-increment',
			input: '.js-increment-input',
			item: '.js-bag-item'
		},
		timer: 500
	};
	const c = _.extend(config, opts);

	const $id = document.getElementById(c.dom.id);
	let delay;

	/**
	* init
	*/
	function init() {
		bindEvents();
	}

	/**
	* bind events
	* @return {Function}
	*/
	function bindEvents() {
		_.addEvent({
			id: $id,
			className: c.dom.btn,
			event: 'click',
			fn: increment
		});
	}

	/**
	* increment
	*/
	function increment() {
		const item = {};
		let newQty;

		/**
		* item attributes
		*/
		[item.increment] = _.parents(this, c.dom.increment);
		item.input = item.increment.querySelector(c.dom.input);
		[item.el] = _.parents(this, c.dom.item);
		item.action = this.getAttribute('data-action');
		item.id = item.el.getAttribute('data-variant-id');

		const qty = parseInt(item.input.value, 10);

		// clear timeout
		clearTimeout(delay);

		// get new qty
		if (item.action === c.action.add) {
			newQty = qty + 1;
		} else if (qty > 0) {
			newQty = qty - 1;
		} else {
			newQty = 0;
		}

		item.input.value = newQty;

		// callback
		if (c.cb) {
			delay = setTimeout(() => {
				c.cb(item, newQty);
			}, c.timer);
		}
	}

	return init();
};