/**
 * product
 *
 * import dependencies
 * namespace
 * run
 * fire functions
 */
// import Flickity from 'flickity';
import $script from '../plugins/scripts';
import ProductConfigurables from '../lib/product-configurables';
import ProductPhotos from '../lib/product-photos';
import ProductSwatches from '../lib/product-swatches';
import Video from '../lib/video';
import ProductRelated from '../lib/product-related';
import ShadeInfo from '../lib/product-shade-info';

/**
 * product namespace
 * @type {Object}
 */
SDG.Product = SDG.Product || {};

/**
 * run
 * @type {Function}
 */
SDG.Product.run = function() {

	// configurables
	$script([path.flickity, path.shopify_options, path.product_essentials], () => {
		ProductSwatches().init();
		ProductPhotos().init();
		ProductConfigurables({
			use: {
				color_label: true,
				config_label: true
			}
		});

	});

	// add to bag
	SDG.Bag.form();

	// video
	const videoEmbed = Video();
	videoEmbed.init();

	// related products
	ProductRelated();

	// open shade info tab
	const shade = ShadeInfo();
	shade.init();

	// ingredients list modal
	const modalOptsIngr = {
		dom: {
			modal_id: 'ingredientsListModal',
			overlay: 'ingredientsListOverlay',
			trigger: 'ingredientsListTrigger'
		}
	};
	const modalIngr = SDG.Modal.init(modalOptsIngr);
	modalIngr.init();
};

/**
 * fire functions
 */
SDG.Product.run();