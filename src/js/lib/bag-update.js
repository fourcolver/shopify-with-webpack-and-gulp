/**
* update item quantity
* @param {Object} item
* @param {number} qty
*/
SDG.Bag.updateItemQty = function(item, qty) {
	const c = SDG.Bag.config;
	const dataObject = {
		quantity: qty,
		id: _.toNumber(item.id)
	};
	const $bagItem = document.getElementById(`bagItem${item.id}`);
	const $bagItemMessages = $bagItem.querySelector(c.dom.item_messages);

	/**
	 * init
	 */
	function init() {

		if (item.el) {
			_.addClass(item.el, c.cls.loading);
		}

		_.ajax({
			data: dataObject,
			error: onError,
			success: updateItem,
			type: 'POST',
			url: c.url.update
		});
	}

	/**
	 * update item
	 * @param {Object} data
	 */
	function updateItem(data) {

		// variant and qty
		const variant = SDG.Bag.variant(item.id, bagItems);
		const variantData = variant.getData();
		console.log(variantData);
		const variantMaxQty = variantData.inventory_quantity;
		const isMax = variant.isMax();
		const qtyUpdated = isMax ? variantMaxQty : qty;

		// message
		const message = SDG.Messages.init({
			id: $bagItemMessages,
			msgs: {
				error: `<p>Sorry, ${variantMaxQty} is the max quantity available in this size.</p>`,
			}
		});

		if (item.el) {

			// if set to 0
			if (qty === 0) {

				_.slideUp(item.el);

				_.transition({
					after: removeItemEl(item.el),
					timer: c.timer.slide_up
				});

				// remove item from bagItems array
				SDG.Bag.Items.remove(item.id);

			} else {

				_.removeClass(item.el, c.cls.loading);

				// update item qty and run IntelliSuggest
				SDG.Bag.Items.update(item.id, 'quantity', qtyUpdated);

			}
		}

		if (data.item_count === 0) {
			SDG.Bag.empty(true);
		}

		// Refresh cart object
		SDG.Bag.Cart = data;


		// Add Free Item
		if (typeof giveawayProduct !== 'undefined') {
			SDG.giveaway();
		}

		// if max
		if (isMax) {

			// update increment to reflect max amount
			item.input.value = variantMaxQty;

			// show error message
			message.error();

		} else {

			// clear message
			message.clear();

		}

		if (c.use.count) {
			SDG.Bag.Count.set(data.item_count);
		}

		SDG.Bag.recalc(data.total_price);
		// Refresh bag after item update
		SDG.Bag.refresh();
	}

	/**
	 * remove item element
	 * @param {Element} item
	 */
	function removeItemEl(el) {
		el.remove();
	}

	/**
	 * on error
	 * @param {Object} data
	 */
	function onError(data) {
		console.warn(`Error updating item ${item.id}`);
		console.warn(data);
	}

	return init();
};
