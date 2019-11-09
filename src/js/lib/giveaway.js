/**
 * Add Free Item
 * if item is more than $X amount, add free item
 * @type {Object}
 */
SDG.giveaway = function(opts) {
	const config = {
		// eslint-disable-next-line
		limit: giveawayLimit,
		// eslint-disable-next-line
		product: giveawayProduct,
		active: true,
		inCart: false,
		cart: SDG.Bag.Cart
	};
	const c = _.extend(config, opts);

	/**
	 * init
	 */
	function init() {
		checkItemInCart();
	}

	/**
	 * observe
	 */
	function observeCart() {
		if (!c.inCart) {
			// giveaway product not in cart
			// eslint-disable-next-line
			if (c.cart.total_price > parseInt(c.limit) * 100) {
				// cart over the limit, add giveaway item
				addItemToCart();
			}
		} else {
			// eslint-disable-next-line
			if (c.cart.total_price <= parseInt(c.limit) * 100) {
				// giveaway item in cart and cart below the limit
				removeItemFromCart();
			} else if (c.cart.item_count === 1) {
				// only giveaway item in cart
				removeItemFromCart();
			}
		}
	}

	/**
	 * check item in cart
	 */
	function checkItemInCart() {
		let itemCount = c.cart.item_count;
		const items = c.cart.items;

		if (itemCount > 0) {
			items.forEach((item) => {
				if (item.handle === c.product.handle) {
					itemCount -= 1;
					// eslint-disable-next-line
					if (item.properties._giveaway) {
						c.inCart = true;
					}
				}
			});
		}

		observeCart();
	}

	/**
	 * add to cart
	 */
	function addItemToCart() {
		const properties = {
			// eslint-disable-next-line
			'_giveaway': true,
		};

		const data = {
			quantity: 1,
			id: c.product.variants[0].id,
			properties
		};

		const params = {
			url: '/cart/add.js',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: () => {
				c.inCart = true;
				SDG.Bag.refresh();
			},
		};

		// init ajax
		_.ajax(params);
	}

	/**
	 * remove from cart
	 * @param {boolean} refreshCart
	 */
	function removeItemFromCart(refreshCart) {
		if (refreshCart === undefined) refreshCart = true;
		const params = {
			url: '/cart/update.js',
			type: 'POST',
			data: `updates[${c.product.variants[0].id}]=0`,
			success: (res) => {
				c.inCart = false;
				if (res.item_count === 0) {
					const el = document.getElementById(`bagItem${c.product.variants[0].id}`);
					if (el) {
						el.remove();
					}
				}
				if (refreshCart) {
					SDG.Bag.refresh();
				}
			},
		};

		// init ajax
		_.ajax(params);
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init: init()
	};
};