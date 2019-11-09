/**
* bag
* @requires [lib/util.js,lib/bag-config.js,lib/bag-refresh.js,lib/bag-init.js]
*
* bag namespace
* bag config
* add to bag config
* extend bag config
* form
* add item
* on error
* on success
*/

/**
 * bag namespace
 * @type {Object}
 */
SDG.Bag = SDG.Bag || {};

/**
 * bag - cart
 * store value of cart
 * @type {Object}
 */
SDG.Bag.Cart = {};

/**
 * bag config
 * @type {Object}
 */
SDG.Bag.config = SDG.Bag.config || {};

/**
 * add to bag config
 * @type {Object}
 */
SDG.Bag.config_addto = {
	dom: {
		add_form: 'addToBagForm',
		bag_btn_text: 'btnAddToBagText',
		id: 'id',
		quantity: 'quantity',
		quantity_messages: 'quantityMessages'
	},
	text: {
		bag_default: 'Add to Bag',
		bag_adding: 'Adding...',
		bag_added: 'Added!'
	},
	url: {
		add: '/cart/add.js'
	},
	timer: {
		reset_text: 600
	}
};

/**
 * extend bag config
 * @type {Object}
 */
SDG.Bag.config = _.extend(SDG.Bag.config, SDG.Bag.config_addto);

/**
 * form
 */
SDG.Bag.form = function() {
	const c = SDG.Bag.config;

	/**
	 * init
	 */
	function init() {
		_.addEvent({
			id: c.dom.add_form,
			event: 'submit',
			fn: addToBag
		});
	}

	/**
	 * add to bag
	 * @type {Function}
	 */
	function addToBag(e) {
		e.preventDefault();

		// form values
		const id = this[c.dom.id].value;
		const qty = parseInt(this[c.dom.quantity].value, 10);

		// variant and qty
		const variant = SDG.Bag.variant(id, productJson.variants);
		const variantData = variant.getData();
		const variantMaxQty = variantData.inventory_quantity;
		const isMax = variant.isMax(qty);

    if (globals.dev) console.log(variant,variantData,variantMaxQty,isMax);

    // message
		const message = SDG.Messages.init({
			id: c.dom.quantity_messages,
			msgs: {
				error: `<p>Sorry, ${variantMaxQty} is the max quantity available in this size.</p>`,
			}
		});

		// other
		const $btnText = document.getElementById(c.dom.bag_btn_text);
		let data;

		// if max
		if (isMax) {

			// flag user
			message.error();

		} else {

			// clear messages
			message.clear();

			data = _.serialize(this);
			const dataJson = _.serialize(this, true);
			$btnText.innerHTML = c.text.bag_adding;
			$btnText.disabled = true;

			if (dataJson.addOnProduct) {
				SDG.Bag.addItem(data, variantMaxQty, {
					on_complete: () => { addingAddOnProduct(dataJson.addOnProduct, 1); }
				});
			} else {
				SDG.Bag.addItem(data, variantMaxQty);
			}
		}
	}

	return init();
};

function addingAddOnProduct(productId, variantMaxQty) {
	SDG.Bag.addItem(`quantity=1&id=${productId}`, variantMaxQty);
}

/**
 * add item
 * @param {Object}   data
 * @param {number}   inventoryQty
 * @param {Object} addOnProduct optional
 */
SDG.Bag.addItem = function(data, inventoryQty, addOnProduct) {
	const c = SDG.Bag.config;
	const isAddOnProduct = typeof addOnProduct === 'object';
	const addOnProductHasCompleteCb = isAddOnProduct
	&& typeof addOnProduct.on_complete === 'function';

	// init ajax
	_.ajax({
		data,
		error: () => {
			SDG.Bag.onError();
			if (addOnProductHasCompleteCb) {
				addOnProduct.on_complete();
			}
		},
		success: (itemData) => {
			SDG.Bag.onSuccess(itemData, inventoryQty, isAddOnProduct);
			if (addOnProductHasCompleteCb) {
				addOnProduct.on_complete();
        if (globals.dev) console.log("Add to bag complete...");
			}
		},
		type: 'POST',
		url: c.url.add
	});
};

/**
 * on error
 */
SDG.Bag.onError = function() {
	console.warn('There has been an error.');
};

/**
 * on success
 * @param {Object} data
 * @param {number} inventoryQty
 */
SDG.Bag.onSuccess = function(data, inventoryQty, isAddOnProduct) {
	const c = SDG.Bag.config;
	const $btnText = document.getElementById(c.dom.bag_btn_text);
	const variantIsInBag = SDG.Bag.Items.get(data.variant_id, 'id');

	if (!isAddOnProduct) {

		// set opening flag
		SDG.Bag.isOpening = true;

		// update add to bag button text
		$btnText.innerHTML = c.text.bag_added;

		setTimeout(() => {
			$btnText.innerHTML = c.text.bag_default;
			$btnText.disabled = false;
		}, c.timer.reset_text);
	}

	// refresh
	SDG.Bag.refresh();

	if (!isAddOnProduct) {

		// open
		SDG.Bag.open();
	}

	// add item to bagItems array if it isn't already there
	if (!variantIsInBag) {
		SDG.Bag.Items.add({
			id: data.variant_id,
			inventory_quantity: inventoryQty,
			quantity: data.quantity,
			sku: data.sku
		});

		// FB event track
		// FB event is placed here so it is only invoked once per product
		fbq('track', 'AddToCart', {
			value: parseFloat(productJson.price / 100),
			currency: 'USD',
			content_type: 'product_group',
			content_name: productJson.title,
			content_ids: [productJson.id]
		});
	} else {
		SDG.Bag.Items.update(data.variant_id, 'quantity', data.quantity);
	}
};


//Add PLP items to cart usign the variant ID
const addPlpItemToCart = function(varId) {
  $.ajax({
    type: "POST",
    url: '/cart/add.js',
    data: { quantity: 1, id: varId },
    success: (data) => { SDG.Bag.open(), SDG.Bag.refresh(), console.log(hasafsadfsdfsdfsdfasdfsadfhahah) },
    dataType: "json"
  });
}
$(document).on('click', '.plp-add-to-bag', function(e) {
  e.preventDefault();
  let varId = $(this).attr('data-variant-id');
  addPlpItemToCart(varId);
});
