/**
 * product add on
 */
SDG.Bag.productAddOn = function() {
	const c = {
		cls: {
			loading: 'is-loading',
		},
		id: {
			add_btn: 'productAddOnBtn',
			container: 'bagAddOn',
			qty: 'productAddOnQty',
			variant_id: 'productAddOnVariantId',
		},
	};

	// cached elements
	const $addBtn = document.getElementById(c.id.add_btn);
	const $qtyInput = document.getElementById(c.id.qty);
	const $variantIdInput = document.getElementById(c.id.variant_id);

	// cached values
	const variantId = $variantIdInput.value;

	// cached elements continued
	const $bagItem = document.getElementById(`bagItem${variantId}`);

	/**
	 * init
	 */
	function init() {

		// add events
		addEvents();

		// incrementer
		SDG.incrementer({
			dom: {
				id: c.id.container,
			},
		});
	}

	/**
	 * add events
	 */
	function addEvents() {

		// add button click
		_.addEvent({
			id: $addBtn,
			event: 'click',
			fn: onAddButtonClick,
		});
	}

	/**
	 * on add button click
	 */
	function onAddButtonClick() {
		disableButton();
		addItem();
	}

	/**
	 * add item
	 */
	function addItem() {
		const inventoryQty = $bagItem.getAttribute('data-variant-inventory-quantity');
		const qty = $qtyInput.value;
		const data = {
			quantity: qty,
			id: variantId,
		};

		// add item ajax
		SDG.Bag.addItem(data, inventoryQty, {
			on_complete: enableButton,
		});
	}

	/**
	 * disable button
	 */
	function disableButton() {
		$addBtn.disabled = true;
		_.addClass($addBtn, c.cls.loading);
	}

	/**
	 * enable button
	 */
	function enableButton() {
		$addBtn.disabled = false;
		_.removeClass($addBtn, c.cls.loading);
	}

	return init();
};