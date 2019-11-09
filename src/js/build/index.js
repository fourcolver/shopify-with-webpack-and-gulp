/**
 * import modules
 */
// import Flickity from 'flickity';
import Rellax from 'rellax';
import Video from '../lib/video';
import ProductFeaturettes from '../lib/product-featurettes';
import ToutsReveal from '../lib/anim-scrollreveal';

/**
 * namespace
 * @type {Object}
 */
SDG.Home = SDG.Home || {};

/**
 * run
 */
SDG.Home.run = function() {

	// newsletter banner
	SDG.Newsletter.banner({
		namespace: 'banner'
	});

	// home product grid
	SDG.Home.hpg();

	// home product featurettes
	ProductFeaturettes();

	// b-touts__items fade In on ScrollReveal
	ToutsReveal();

	// video
	const videoEmbed = Video({
		id: 'homeVid'
	});
	videoEmbed.init();


	// // parallax
	// eslint-disable-next-line
	 new Rellax('.js-rellax');


};

/**
 * Home Product Grid
 */
SDG.Home.hpg = function() {
	const c = {
		cls: {
			active: 'is-active',
			selected: 'is-selected'
		},
		id: {
			home_product_grid: 'hpgCarousel'
		}
	};
	const $hpg = document.getElementById(c.id.home_product_grid);

	if ($hpg) {
		/*
		// eslint-disable-next-line
		const flkty = new Flickity(`#${c.id.home_product_grid}`, {
			watchCSS: true,
			pageDots: false
		});
		*/
	}
};

/**
 * fire functions
 */
SDG.Home.run();
