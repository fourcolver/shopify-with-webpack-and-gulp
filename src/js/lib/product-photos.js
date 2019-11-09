/**
* Product
* @requires [lib/util.js]
*
* product namespace
* product config
* product carousel photos
* product carousel thumbs
* photos config
* photos
* run
* run dom ready
* fire functions
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
 * product config
 * @type {Object}
 */
SDG.Product.config = SDG.Product.config || {};

/**
 * product carousel main
 * @type {Object}
 */
SDG.Product.carouselPhotos = SDG.Product.carouselPhotos || {};

/**
 * product carousel thumbs
 * @type {Object}
 */
SDG.Product.carouselThumbs = SDG.Product.carouselThumbs || {};

/**
 * product large thumbs
 * @type {Object}
 */
SDG.Product.largePhotos = SDG.Product.largePhotos || {};

/**
 * photos config
 * @type {Object}
 */
SDG.Product.config_photos = {
	cls: {
		active: 'is-active'
	},
	dom: {
		gallery: 'gallery',
		photo: 'js-photo',
		photos: 'photos',
		status: 'status',
		thumb: 'js-thumb',
		thumbs: 'thumbs',

		large_photos: 'largePhotos',
		large_photos_modal: 'largePhotosModal',
		zoom: 'js-zoom',
		close: 'js-close',
		modal_trigger: 'modalTriggerBtn',
		modal_close: 'modalClose',
		photo_class: 'pv__photo-modal'
	},
	image_json: '',
	photo_size: {
		full_desktop: '670x',
		full_desktop_retina: '1340x',
		full_desktop_zoom: '1300x',

		full_phone: '690x',
		full_phone_retina: '1380x',

		full_tablet: '839x',
		full_tablet_retina: '1678x',

		thumb: '62x62_crop_center',
		thumb_retina: '124x124_crop_center'
	}
};

/**
 * extend product config
 * @type {Object}
 */
SDG.Product.config = _.extend(SDG.Product.config, SDG.Product.config_photos);

/**
* photos
* @type {Function}
* @return {init}
*/
SDG.Product.photos = function(opts) {

	// config
	const c = _.extend(SDG.Product.config, opts);

	// flickity main config
	const flickityPhotosConfig = {
		contain: true,
		draggable: true,
		prevNextButtons: false,
		adaptiveHeight: false,
		pageDots: false,
		cellSelector: '.js-photo'
	};

	// flickity thumbs config
	const flickityThumbsConfig = {
		adaptiveHeight: false,
		asNavFor: `#${c.dom.photos}`,
		cellAlign: 'center',
		contain: true,
		prevNextButtons: false,
		pageDots: false,
		draggable: true
	};

	// flickity thumbs config
	const flickityLargePhotosConfig = {
		contain: true,
		prevNextButtons: true,
		adaptiveHeight: true,
		pageDots: false,
		wrapAround: true
	};

	// modal large photos
	const galleryZoom = SDG.Modal.init({
		dom: {
			modal_id: c.dom.large_photos_modal,
			trigger: c.dom.modal_trigger
		}
	});

	// cached globals
	const imageData = c.image_json ? c.image_json : imageJson;
	const $photos = document.getElementById(c.dom.photos);
	const $thumbs = document.getElementById(c.dom.thumbs);
	const $largePhotos = document.getElementById(c.dom.large_photos);

	/**
	 * init
	 */
	function init() {
		initGallery();

		// build regular slides if normal images w/o color alt tags
		// otherwise, specific color galleries are built from product-swatches.js,
		// and is called from product-configurables.js
		// @see src/js/lib/product-swatches.js
		// @see src/js/lib/product-configurables.js
		const hasAltImages = hasSomeSwatchJson();

		initModalGallery();

		if (!hasAltImages) {
			buildSlides();
		}

		responsive();
		_.windowResize(responsive);

	}

	function responsive() {
		_.mq({
			view: 'desktop',
			callback: () => {
				initModal();
				addEvents();
			}
		});
	}

	/**
	* add events
	* @type {Function}
	*/
	function addEvents() {
		_.addEvent({
			id: c.dom.photos,
			className: c.dom.photo,
			event: 'click',
			fn: openModal
		});

		_.addEvent({
			id: c.dom.modal_add_to_bag,
			event: 'click',
			fn: closeModal
		});
	}

	/**
	* init modal
	*/
	function initModal() {
		galleryZoom.init();
	}

	function initModalGallery() {
		SDG.Product.largePhotos = new Flickity($largePhotos, flickityLargePhotosConfig);
		// buildSlides();
	}

	/**
	* init gallery
	* @desc global so that other product js files have access to the flkty object
	*/
	function initGallery() {
		SDG.Product.carouselPhotos = new Flickity($photos, flickityPhotosConfig);
		SDG.Product.carouselThumbs = $thumbs ? new Flickity($thumbs, flickityThumbsConfig) : null;
	}

	/**
	 * build slides
	 * @param {Object} json
	 */
	function buildSlides(json) {
		const photos = [];
		const thumbs = [];
		const largePhotos = [];
		const isJsonEmpty = Array.isArray(json) && !json.length;
		let	firstSwatchNameWithImages;
		let	img;
		let	imgJson;
		let	photo;
		let	thumb;
		let largePhoto;

		// if imgJson is empty, i.e. if some images have color alts
		// and others don't, set imgJson to first set of swatch images
		// else set as normal, i.e. as param or imageData

		if (isJsonEmpty) {
			firstSwatchNameWithImages = getFirstSwatchNameWithImages();
			imgJson = firstSwatchNameWithImages ? SDG.Product.swatchJson[firstSwatchNameWithImages] : imageData;  // eslint-disable-line
		} else if (json) {
			imgJson = json;
		} else {
			imgJson = imageData;
		}

		Object.keys(imgJson).forEach((key) => {
			img = imgJson[key];
			photo = getPhotoHtml(img, key);
			thumb = getThumbHtml(img, key);
			largePhoto = getPhotoHtml(img, key);

			photos.push(photo);
			thumbs.push(thumb);
			largePhotos.push(largePhoto);
		});

		if (photos.length > 0 && thumbs.length > 0 && $thumbs) {
			flktyEmpty();
			attachToFlkty(photos, thumbs);
		}

		responsive();
		_.windowResize(responsive);

		flktyEmptyLargePhotos();
		attachToFlktyLargePhotos(largePhotos);

	}

	function flktyEmpty() {
		const $photoSlides = $photos.querySelectorAll(`.${c.dom.photo}`);
		const $thumbSlides = $thumbs ? $thumbs.querySelectorAll(`.${c.dom.thumb}`) : false;

		if ($photoSlides) {
			SDG.Product.carouselPhotos.remove($photoSlides);
		}

		if ($thumbSlides) {
			SDG.Product.carouselThumbs.remove($thumbSlides);
		}

	}

	function flktyEmptyLargePhotos() {
		const $largePhotosSlides = $largePhotos.querySelectorAll(`.${c.dom.photo}`);

		if ($largePhotosSlides) {
			SDG.Product.largePhotos.remove($largePhotosSlides);
		}

	}

	function attachToFlkty(photos, thumbs) {

		SDG.Product.carouselPhotos.append(photos);
		SDG.Product.carouselPhotos.select(0);

		if ($thumbs) {
			SDG.Product.carouselThumbs.append(thumbs);
			SDG.Product.carouselThumbs.select(0);
		}

	}

	function attachToFlktyLargePhotos(largePhotos) {

		SDG.Product.largePhotos.insert(largePhotos);
		SDG.Product.largePhotos.select(0);

	}

	function getPhotoHtml(img, key) {

		let html;

		// only continue if 'img' is an object
		if (typeof (img) === 'object') {

			html = document.createElement('div');
			html.className = 'pv-photo js-photo';
			html.setAttribute('data-index', key);
			html.innerHTML = `<div class="pv-photo__inner">
								<div class="ir is-loading is-loading--pink" style="padding-bottom:${img.ratio}">
									<div class="desktop-only">
										<img class="lazyload" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.full)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.full_retina)} 2x" alt="${img.alt} Desktop" />
									</div>
									<div class="mobile-only">
										<img class="lazyload tablet-only" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.full)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.full_retina)} 2x" alt="${img.alt} Tablet" />
										<img class="lazyload phone-only" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.full)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.full_retina)} 2x" alt="${img.alt} Phone" />
									</div>
								</div>
							  </div>
							 `;
		}

		return html;
	}

	function getThumbHtml(img) {

		let html;

		// only continue if 'img' is an object
		if (typeof (img) === 'object') {

			html = document.createElement('div');
			html.className = 'pv-thumb js-thumb';
			html.innerHTML = `<div class="ir ir--square is-loading is-loading--pink">
								<div class="pv-thumb__inner">
									<img class="lazyload pv-thumb__img" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.thumb)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.thumb_retina)} 2x" alt="${img.alt}" />
								</div>
							</div>`;
		}

		return html;
	}

	/**
	 * check swatch json
	 * @return {Boolean} [description]
	 */
	function hasSomeSwatchJson() {
		return Object.keys(SDG.Product.swatchJson).some(hasSwatchJson);
	}

	/**
	 * has swatch json
	 * @callback
	 * @param  {String}  color
	 * @return {Boolean}
	 */
	function hasSwatchJson(color) {
		return SDG.Product.swatchJson[color].length;
	}

	/**
	 * get first swatch name with images
	 * @return {String}
	 */
	function getFirstSwatchNameWithImages() {
		return Object.keys(SDG.Product.swatchJson).filter(hasSwatchJson)[0];
	}

	/**
	 * open modal
	 * @type {Function}
	 */
	function openModal() {
		galleryZoom.open(c.dom.large_photos_modal);
		// jump to image
		const index = this.getAttribute('data-index');
		window.location.hash = `pi-lg-${index}`;

		SDG.Product.largePhotos.select(index);
	}

	/**
	* close modal
	* @type {Function}
	*/
	function closeModal() {
		galleryZoom.close();
		// clearing hash from url address
		window.location.hash = '';
	}

	return {
		init,
		buildSlides
	};
};

export default SDG.Product.photos;
