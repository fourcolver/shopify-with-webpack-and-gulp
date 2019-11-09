/**
* product
*
* import dependencies
* require dependencies
* product namespace
* gallery config
* gallery
*/

/**
 * import dependencies
 */
import Flickity from 'flickity';

/**
 * require dependencies
 */
require('flickity-as-nav-for');

/**
 * product namespace
 * @type {Object}
 */
SDG.Product = SDG.Product || {};

/**
 * gallery config
 * @type {Object}
 */
SDG.Product.config_photos = {
	id: {
		photos: 'photos',
		thumbs: 'thumbs'
	}
};

/**
 * gallery
 * @return {Object}
 */
SDG.Product.gallery = function() {
	const c = SDG.Product.config_photos;

	// cached globals
	const imgCount = imageJson.length;
	const $photos = document.getElementById(c.id.photos);
	const $thumbs = document.getElementById(c.id.thumbs);
	const shouldInitGallery = imgCount > 1;
	const photosOptions = {
		contain: true,
		draggable: true,
		prevNextButtons: false,
		adaptiveHeight: false,
		pageDots: false,
		cellSelector: '.js-photo'
	};
	const thumbsOptions = {
		adaptiveHeight: false,
		asNavFor: $photos,
		cellAlign: 'center',
		contain: true,
		prevNextButtons: false,
		pageDots: false,
		draggable: true
	};
	let flickityIsInit = false;
	let flickityPhotos;
	let flickityThumbs;
	let view;

	/**
	 * init
	 * @return {Function}
	 */
	function init() {
		if (!shouldInitGallery) return;

		onWindowResize();
		initGallery();
	}

	/**
	 * init gallery
	 */
	function initGallery() {

		// eslint-disable-next-line
		flickityPhotos = new Flickity($photos, photosOptions);

		// eslint-disable-next-line
		flickityThumbs = new Flickity($thumbs, thumbsOptions);

		// set flag
		flickityIsInit = true;

		// add events
		addAfterFlickityInitEvents();
	}

	/**
	 * add after flickity init events
	 */
	function addAfterFlickityInitEvents() {
		_.windowResize(onWindowResize);
	}

	function everySecondImg() {

	}

	/**
	 * on window resize
	 */
	function onWindowResize() {

		// desktop
		_.mq({
			view: 'desktop',
			callback: () => {
				if (view !== 'desktop') {
					photosOptions.draggable = false;
					rebuildFlickity();
					view = 'desktop';
				}
			}
		});

		// mobile
		_.mq({
			view: 'mobile',
			callback: () => {
				if (view !== 'mobile') {
					photosOptions.draggable = true;
					rebuildFlickity();
					view = 'mobile';
				}
			}
		});
	}

	/**
	 * rebuild flickity
	 */
	function rebuildFlickity() {

		// if flickity is already initialized, exit function
		if (!flickityIsInit) return false;

		flickityPhotos.destroy();
		flickityPhotos = new Flickity($photos, photosOptions);

		flickityThumbs.destroy();
		flickityThumbs = new Flickity($thumbs, thumbsOptions);

		return undefined;
	}

	return init();
};

export default SDG.Product.gallery;
