/**
* product configurables
*
* import dependencies
* product namespace
* product config
* config
* extend product config
* state
* configurables
*/

/**
 * import dependencies
 */
import formatMoney from '../util/format-money';

/**
 * product namespace
 * @type {Object}
 */
SDG.Product = SDG.Product || {};

/**
 * product config
 * @type {Object}
 */
SDG.Product.config = SDG.Product.config || {};

/**
 * config
 * @type {Object}
 */
SDG.Product.config_cfgs = {
	cls: {
		active: 'is-active',
		disabled: 'is-disabled',
		special_price: 'has-special-price',
		visible: 'is-visible'
	},
	dom: {
		btn: 'js-config-btn',
		btn_color: 'js-config-btn-color',
		group: 'js-config-group',
		label: 'js-config-label',
		price_original: '.js-price-original',
		price_compare: '.js-price-compare',
		radio: 'js-config-radio',
		select_beta: '.single-option-selector',
		variant: '.js-config-variant'

	},
	hide_bag_btn: true,
	id: {
		bag_btn: 'btnAddToBag',
		bag_text: 'btnAddToBagText',
		color_label: 'colorLabel',
		config_options: 'configOptions',
		form: 'addToBagForm',
		price_container: ['productPrice'],
		select_alpha: 'productSelect'
	},
	namespace: null,
	image_json: '',
	product_json: '',
	text: {
		bag_default: 'Add to Bag',
		bag_outofstock: 'Sold Out'
	},
	use: {
		color_label: false,
		config_label: false,
		config_label_remap: false,
		notify: true,
		update_price: true
	}
};

/**
 * extend product config
 * @type {Object}
 */
SDG.Product.config = _.extend(SDG.Product.config, SDG.Product.config_cfgs);

/**
 * state
 * @type {Object}
 */
SDG.Product.state = {
	bag_btn: {
		is_default: true
	}
};


/**
 * configurables
 * @param  {Object} opts
 * @return {productConfigurables~init}
 */
function productConfigurables(opts) {
	const c = _.extend(SDG.Product.config, opts);

	// namespace
	if (c.namespace) {
		c.id = _.namespace(c.id, c.namespace);
	}

	// state
	const { state } = SDG.Product;

	// cached globals
	const $form = document.getElementById(c.id.form);
	const $allGroups = $form.querySelectorAll(`.${c.dom.group}`);
	const $allBtns = $form.querySelectorAll(`.${c.dom.btn}`);
	const $bagBtn = document.getElementById(c.id.bag_btn);
	const $bagText = document.getElementById(c.id.bag_text);
	const $configOptions = document.getElementById(c.id.config_options);
	const productIsDefaultOption = isDefaultOption();
	let notify;

	// set product data
	const imageData = c.product_json ? c.product_json : imageJson;
	const productData = c.product_json ? c.product_json : productJson;

	/**
	 * init
	 * @type {Function}
	 */
	function init() {

		// select first
		selectFirst();

		if ($configOptions) {
			// eslint-disable-next-line
			new Shopify.OptionSelectors(c.id.select_alpha, {
				product: productData,
				onVariantSelected: selectCallback
			});
		}

		// add events
		addEvents();

		// set notify
		if (typeof ProductNotify === 'function' && c.use.notify) {
			notify = ProductNotify(); // eslint-disable-line
		}
	}

	/**
	 * add events
	 */
	function addEvents() {

		// radio change
		_.addEvent({
			id: $form,
			className: c.dom.radio,
			event: 'change',
			fn: updateSelect
		});

		// button click
		_.addEvent({
			id: $form,
			className: c.dom.btn,
			event: 'click',
			fn: onButtonClick
		});
	}

	/**
	 * shopify select callback
	 * @type {Function}
	 */
	function selectCallback(variant, selector) {

		// only continue if variant exists
		if (!variant) return;

		// set active radios
		setActiveRadios();

		// check stock
		checkStock(variant, selector);

		// update price
		if (c.use.update_price) {
			updatePrice(variant);
		}

		// update color label
		if (c.use.color_label) {
			updateColorLabel();
		}

		// update config label
		if (c.use.config_label) {
			updateConfigLabel();
		}

		// update photos
		/* eslint-disable */
		if (SDG.Product.swatches) {
			SDG.Product.swatches({
				image_json: imageData,
				product_json: productData
			}).update(variant);
		}
		/* eslint-enable */
	}

	/**
	 * on button click
	 */
	function onButtonClick() {
		setActiveButton(this);
	}

	/**
	 * update select
	 * @type {Function}
	 */
	function updateSelect() {
		const $opt = _.parents(this, `.${c.dom.group}`)[0];
		const val = this.value;
		const idx = $opt.getAttribute('data-option-index');
		const $select = $form.querySelectorAll(c.dom.select_beta)[idx];
		const $option = $select.querySelector(`option[value="${val}"]`);

		$option.selected = true;
		_.trigger($select, 'change');
	}

	/**
	 * set active button
	 */
	function setActiveButton($btn) {
		const isActive = _.hasClass($btn, c.cls.active);

		// if already active, exit function
		if (isActive) return;

		// get active button
		const $parentGroup = _.parents($btn, `.${c.dom.group}`)[0];
		const $active = $parentGroup.querySelector(`.${c.cls.active}`);

		// remove currently selected active class
		if ($active) {
			_.removeClass($active, c.cls.active);
		}

		// add active class to newly selected button
		_.addClass($btn, c.cls.active);
	}

	/**
	 * set active radios
	 */
	function setActiveRadios() {

		// if product is default option, exit
		if (productIsDefaultOption) return;

		// get active buttons
		const $btns = $configOptions.querySelectorAll(`.${c.dom.btn}.${c.cls.active}`);

		// if there are no active buttons, exit
		if (!$btns) return;

		// loop over buttons, checking its radio
		$btns.forEach(($btn) => {
			$btn.previousElementSibling.checked = true;
		});
	}

	/**
	 * check stock
	 * @param {Object} variant
	 * @param {Object} selector
	 */
	function checkStock(variant, selector) {
		const { product } = selector;
		const { variants } = product;
		const variantsCount = variants.length;
		let $groups;
		let obj;

		if (variantsCount > 1) {

			if ($allGroups.length > 1) {
				$groups = getOtherGroups();
				enableAllBtns();
				disableVariantOptions($groups);
			}

			$allGroups.forEach(($group) => {
				Object.keys(variants).forEach((key) => {
					obj = variants[key];

					if (variant.option1 === obj.option1) {

						handleVariantOptions($group, obj);

						const { id, available } = variant;

						setStockStatus(available, id);
					}
				});
			});

		} else {

			setStockStatus(variant.available, variant.id);

		}
	}

	/**
	 * handle variant options
	 * @param {Object} obj
	 */
	function handleVariantOptions($group, obj) {
		const str = 'option';
		let i;
		let opt;
		let value;
		let $btn;
		let $variant;

		for (i = 1; i < 4; i += 1) {
			opt = str + i;

			if (obj[opt]) {

				value = obj[opt];
				$variant = $group.querySelector(`${c.dom.variant}[data-value="${value}"]`);
				$btn = $group.querySelector(`.${c.dom.btn}`);

				_.show($btn);

				if (obj.available) {
					_.removeClass($btn, c.cls.disabled);
				}
			}
		}
	}

	/**
	 * get other groups
	 */
	function getOtherGroups() {
		const $groups = [];
		let $group;

		Object.keys($allGroups).forEach((key) => {
			if (key !== '0') {
				$group = $allGroups[key];
				$groups.push($group);
			}
		});

		return $groups;
	}

	/**
	 * disable variant options
	 * @param {Array} groups
	 */


	function disableVariantOptions($groups) {

		function initLoop() {
			let $group;
			let $btn;

			if ($groups && $groups.length > 0) {
				Object.keys($groups).forEach((key) => {
					$group = $groups[key];
					$btn = $group.querySelectorAll(`.${c.dom.btn}`);

					loop($btn);
				});
			}
		}

		function loop($btn) {

			if ($btn) {
				Object.keys($btn).forEach((i) => {
					_.addClass($btn[i], c.cls.disabled);
					_.hide($btn[i]);
				});
			}
		}

		return initLoop();
	}

	/**
	 * enable all buttons
	 */
	function enableAllBtns() {
		let $btn;

		Object.keys($allBtns).forEach((key) => {
			$btn = $allBtns[key];
			_.removeClass($btn, c.cls.disabled);
			_.show($btn);
		});
	}

	/**
	 * set stock status
	 * @param {Boolean} available
	 * @param {Number}  id
	 */
	function setStockStatus(available, id) {

		// if notify form
		if (notify) {

			if (available) {

				_.show($bagBtn);
				setBagButtonDefault();

			} else if (c.hide_bag_btn) {

				_.hide($bagBtn);

			} else {

				setBagButtonOutOfStock();

			}

			notify.show(available, id);

		} else if (available) { // else no notify form

			setBagButtonDefault();

		} else {

			setBagButtonOutOfStock();

		}
	}

	/**
	 * set bag button default
	 */
	function setBagButtonDefault() {

		// if already set to default, exit function
		if (state.bag_btn.is_default) return;

		// set flag
		state.bag_btn.is_default = true;

		// modify button
		_.removeClass($bagBtn, c.cls.disabled);
		$bagBtn.disabled = false;
		$bagText.innerHTML = c.text.bag_default;
	}

	/**
	 * set bag button out of stock
	 */
	function setBagButtonOutOfStock() {

		// if already set as not default, exit function
		if (!state.bag_btn.is_default) return;

		// set flag
		state.bag_btn.is_default = false;

		// modify button
		_.addClass($bagBtn, c.cls.disabled);
		$bagBtn.disabled = true;
		$bagText.innerHTML = c.text.bag_outofstock;
	}

	/**
	 * update price
	 * @param {Object} variant
	 */
	function updatePrice(variant) {
		const { price, compare_at_price: priceCompare } = variant;
		const hasSpecialPrice = priceCompare > price;
		const priceCompareDisplay = `${formatMoney(priceCompare, 'amount_with_currency_without_trailing_zeros')}`;
		const priceCompareDisplayStyle = hasSpecialPrice ? 'inline-block' : 'none';
		const priceCompareDisplayClassMethod = hasSpecialPrice ? 'addClass' : 'removeClass';
		const displayPriceCompare = (el, display) => {
			$price = document.getElementById(el);
			if ($price) {
				$priceCompare = $price.querySelector(c.dom.price_compare);
				$priceCompare.style.display = display;
				_[priceCompareDisplayClassMethod]($price, c.cls.special_price);
			}
		};
		const updatePriceCompare = (el) => {
			$price = document.getElementById(el);
			if ($price) {
				$price.querySelector(c.dom.price_compare).innerHTML = priceCompareDisplay;
				$price.querySelector(c.dom.price_original).innerHTML = priceDisplay;
			}
		};
		const updatePriceOriginal = (el) => {
			$price = document.getElementById(el);
			if ($price) {
				$price.querySelector(c.dom.price_compare).innerHTML = '';
				$price.querySelector(c.dom.price_original).innerHTML = priceDisplay;
			}
		};
		let priceDisplay = `${formatMoney(price, 'amount_with_currency_without_trailing_zeros')}`;
		let $price;
		let $priceCompare;

		// format price display
		if (hasSpecialPrice) {
			priceDisplay = `Now ${priceDisplay}`;
		}

		// update prices
		if (hasSpecialPrice) {
			c.id.price_container.forEach(updatePriceCompare);
		} else {
			c.id.price_container.forEach(updatePriceOriginal);
		}

		// update price compare display
		c.id.price_container.forEach(el => displayPriceCompare(el, priceCompareDisplayStyle));
	}

	/**
	 * update color label
	 */
	function updateColorLabel() {
		const $activeColor = $form.querySelector(`.${c.dom.btn_color}.${c.cls.active}`);
		const $colorLabel = document.getElementById(c.id.color_label);

		if (!$activeColor || !$colorLabel) return;

		$colorLabel.innerHTML = $activeColor.getAttribute('data-val');
	}

	/**
	 * update config label
	 */
	function updateConfigLabel() {
		const $activeBtns = $form.querySelectorAll(`.${c.dom.btn}.${c.cls.active}`);
		let $active;
		let $group;
		let $label;
		let val;
		let valFormat;

		if ($activeBtns) {
			Object.keys($activeBtns).forEach((key) => {
				$active = $activeBtns[key];
				val = $active.getAttribute('data-val');
				valFormat = c.use.config_label_remap ? _.remapSizeValues(val) : val;
				[$group] = _.parents($active, `.${c.dom.group}`);
				$label = $group.querySelector(`.${c.dom.label}`);

				// if (valFormat.indexOf('Glow Down') > -1) {
				// 	valFormat = `${valFormat} <span>(New Shade!)</span>`;
				// }

				// set label
				$label.innerHTML = valFormat;
			});
		}
	}

	/**
	 * select first
	 */
	function selectFirst() {
		let $group;
		let $btn;

		Object.keys($allGroups).forEach((key) => {
			$group = $allGroups[key];
			[$btn] = $group.querySelectorAll(`.${c.dom.btn}:not(.${c.cls.disabled})`);

			if ($btn) {
				_.addClass($btn, c.cls.active);
			}
		});
	}

	/**
	 * is default option
	 * check if product has default option of 'title'
	 * @return {Boolean}
	 */
	function isDefaultOption() {
		const lowercaseOptions = _.arrayToLower(productJson.options);
		let isDefault = false;

		lowercaseOptions.forEach((option) => {
			if (option === 'title') {
				isDefault = true;
			}
		});

		return isDefault;
	}

	return init();
}

export default productConfigurables;
