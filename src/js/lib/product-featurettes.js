/**
 * Home Product Featurettes
 */

import Flickity from 'flickity';

SDG.ProductFeaturettes = function(opts) {
	const config = {
		cls: {
			background: '.js-pf-bg',
			next_btn: 'js-carousel-next',
			prev_btn: 'js-carousel-prev',
			background_set: 'bg-set',
			visible: 'is-visible'
		},
		id: {
			carousel: 'pfCarousel',
		},
		timer: 150
	};
	const c = _.extend(config, opts);
	const $pf = document.getElementById(c.id.carousel);
	let $pfBackgrounds;
	let flkty;


	if ($pf) {
		$pfBackgrounds = $pf.querySelectorAll(c.cls.background);

		// slide effect on Founder Section
		// backgroundSlide({
		// 	id: 'pf__carousel',
		// 	offset: 500,
		// 	timer: 200,
		// 	cl: 'pf__content'
		// }).init();

		addEvents();

		// eslint-disable-next-line
		flkty = new Flickity(`#${c.id.carousel}`, {
			cellAlign: 'left',
			fullscreen: true,
			pageDots: false,
			prevNextButtons: false,
			wrapAround: true
		});
	}

	function addEvents() {
		_.addEvent({
			id: c.id.carousel,
			className: c.cls.next_btn,
			event: 'click',
			fn() {
				flkty.next();
			}
		});

		_.addEvent({
			id: c.id.carousel,
			className: c.cls.prev_btn,
			event: 'click',
			fn() {
				flkty.previous();
			}
		});

		_.waypoint({
			el: $pf,
			in: triggerParalax,
			offset: 700
		});
	}

	function triggerParalax() {
		Array.prototype.forEach.call($pfBackgrounds, (bg) => {
			_.addClass(bg, c.cls.visible);
		});

		setTimeout(showContent, c.timer);
	}

	function showContent() {
		_.addClass($pf, c.cls.background_set);
	}
};

export default SDG.ProductFeaturettes;
