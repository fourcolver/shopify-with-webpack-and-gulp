SDG.removePastGiveawayItem = function(opts) {

	const config = {
		giveaway_current: window.giveawayItemId,
		giveaway_enabled: window.giveawayEnabled,
		cart: SDG.Bag.Cart
	};
	const c = _.extend(config, opts);

	/**
	* init
	*/
	function init() {
		checkItemInCart();
	}

	function checkItemInCart() {
		const itemCount = c.cart.item_count;
		const items = c.cart.items;
		const itemCurrent = c.giveaway_current;

		if (itemCount > 0) {

			items.forEach((item) => {
				// eslint-disable-next-line
				const val = item.properties ? item.properties._giveaway === true : false;
				const itemGiveaway = val !== undefined ? val : '';
				const itemId = item.product_id;
				// eslint-disable-next-line
				if ((itemId !== itemCurrent && itemGiveaway === true) || (itemId === itemCurrent && c.giveaway_enabled === false)) {

					const params = {
						url: '/cart/update.js',
						type: 'POST',
						data: `updates[${item.variant_id}]=0`,
						success: () => {
							SDG.Bag.refresh();
						},
					};

					// init ajax
					_.ajax(params);
				}

			});
		}
	}

	/**
	* return
	* @type {Object}
	*/
	return init();
};