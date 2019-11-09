/*
* Product
*
* product namespace
* @type {Object}
*/
import Flickity from 'flickity';

SDG.Product = SDG.Product || {};

/**
 * related carousel
 * @type {Object}
 */
SDG.Product.relatedProducts = SDG.Product.relatedProducts || {};

SDG.Product.related = function() {

	// globals
	const relatedCarouselEl = document.getElementById('relatedList');

	function init() {
		if (relatedCarouselEl) {
			initFlickity();
			addEvents();
		}
	}

	function addEvents() {

		_.addEvent({
			id: 'flickPrev',
			event: 'click',
			fn: prev
		});

		_.addEvent({
			id: 'flickNext',
			event: 'click',
			fn: next
		});
	}

	function prev() {
		SDG.Product.relatedProducts.previous();
	}

	function next() {
		SDG.Product.relatedProducts.next();
	}

	function initFlickity() {

		SDG.Product.relatedProducts = new Flickity(relatedCarouselEl, {
			contain: true,
			cellAlign: 'left',
			pageDots: false,
			watchCSS: true,
			prevNextButtons: false,
			cellSelector: '.related-item'
		});
	}


	return init();

};

export default SDG.Product.related;