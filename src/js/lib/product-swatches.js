/**
* namespace
*/
SDG.Product = SDG.Product || {};

/**
* swatch json array
* @type {Object}
*/
SDG.Product.swatchJson = {};

/**
* active swatch
*/
SDG.Product.activeColor = '';

/**
* swatches
* @return {Function} builds swatchJson array
*/
SDG.Product.swatches = function(opts) {
	const config = {
		image_json: '',
		product_json: ''
	};
	const c = _.extend(config, opts);

	// cached globals
	// const $form = document.getElementById('addToBagForm');
	const productData = c.product_json ? c.product_json : productJson;
	const imageData = c.image_json ? c.image_json : imageJson;
	const options = _.arrayToLower(JSON.parse(JSON.stringify(productData.options)));
	const idx = options.indexOf('color');
	/**
	* build
	*/
	function init() {

		if (options.indexOf('color') !== -1) {
			buildJson();
		}

	}

	/**
	* build json
	*/
	function buildJson() {
		addColorNodes();
		parseImages();
	}

	/**
	* add color nodes
	*/
	function addColorNodes() {
		const colors = [];
		let color;
		let i;
		const v = productData.variants;
		const count = v.length;

		for (i = 0; i < count; i += 1) {
			color = v[i].options[idx].toLowerCase();

			if (colors.indexOf(color) === -1) {
				colors.push(color);
				SDG.Product.swatchJson[color] = [];
			}
		}
	}

	function parseImages() {

		Object.keys(imageData).forEach((key) => {
			const img = imageData[key];
			const color = img.alt.toLowerCase();

			if (typeof SDG.Product.swatchJson[color] !== 'undefined') {
				SDG.Product.swatchJson[color].push(img);
			}
		});
	}

	function update(variant) {

		const color = variant.options[idx] ? variant.options[idx].toLowerCase() : null;

		// only continue if swatch json is properly constructed
		if (typeof SDG.Product.swatchJson[color] !== 'undefined') {
			if (SDG.Product.activeColor !== color) {
				SDG.Product.photos({
					image_json: imageData
				}).buildSlides(SDG.Product.swatchJson[color]);

				SDG.Product.activeColor = color;
			}
		}


	}

	return {
		init,
		update
	};
};

export default SDG.Product.swatches;