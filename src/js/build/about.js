import Rellax from 'rellax';
import backgroundSlide from '../lib/bg-slide';
import textAnimation from '../lib/text-animation';

/**
* About
*
* namespace
* run
* fire functions
*/

/**
* Account namespace
* @type {Object}
*/
SDG.About = SDG.About || {};

SDG.About.config = {
	dom: {
		grid_tab: 'gridTab',
		grid_tab_btn: 'js-claims-btn',
		modal_content: 'modal__wrap'
	},
	modal: {
		id: 'aboutClaimsModal',
		overlay: 'aboutClaimsOverlay'
	},
	offset: 134
};

SDG.About.run = function(opts) {

	const c = _.extend(SDG.About.config, opts);

	// cached globals
	const tabs = Array.from(document.getElementsByClassName('safety__tab'));
	const gridTab = document.getElementById('gridTab');
	const whyTab = document.getElementById('safetyWhyTab');
	const $modal = document.getElementById(c.modal.id);
	const $modalContents = $modal.querySelectorAll(`.${c.dom.modal_content}`);

	// about claims modal
	const modalOptsClaims = {
		dom: {
			modal_id: c.modal.id,
			overlay: c.modal.overlay
		}
	};
	const modalClaims = SDG.Modal.init(modalOptsClaims);

	function init() {

		handleTabs();

		// text animation
		textAnimation({
			id: 'redefiningPretty'
		}).init();

		// slide effect on Founder Section
		backgroundSlide({
			id: 'aboutFounder',
			offset: 500,
			timer: 200
		}).init();

		// slide effect on About__Aim aimPhoto
		backgroundSlide({
			id: 'aboutAim',
			cls: 'aim_photo',
			offset: 400,
			timer: 300
		}).init();

		// image fly-ins
		textAnimation({
			id: 'aboutAim',
			offset: 500
		}).init();

		// slide effect on Scent Section
		backgroundSlide({
			id: 'scentSection',
			offset: 500,
			timer: 200
		}).init();

		// comment out for now, in-progress
		// // parallax
		// eslint-disable-next-line
		 new Rellax('.js-rellax');

		// about claims modal
		modalClaims.init();

		// add events
		addEvents();
	}

	function handleTabs() {
		if (tabs) {

			tabs.forEach((tab, index) => {
				tab.addEventListener('click', () => {
					if (tab.classList.contains('is-active')) {
						// do nothing
					} else {
						if (index === 0) {
							_.removeClass(tabs[1], 'is-active');
							whyTab.style.display = 'none';
							gridTab.style.display = 'flex';
						} else {
							_.removeClass(tabs[0], 'is-active');
							gridTab.style.display = 'none';
							whyTab.style.display = 'flex';
						}
						_.addClass(tab, 'is-active');
					}
				});
			});
		}
	}

	function addEvents() {
		_.addEvent({
			id: c.dom.grid_tab,
			className: c.dom.grid_tab_btn,
			event: 'click',
			fn: openClaimsModal
		});
	}

	function openClaimsModal(e) {

		const claimBtn = e.target.getAttribute('data-claims-btn');

		for (let i = 0; i < $modalContents.length; i += 1) {
			const claimModal = $modalContents[i].getAttribute('data-claims-modal');

			if (claimBtn === claimModal) {
				_.removeClass($modalContents[i], 'hide');
			} else {
				_.addClass($modalContents[i], 'hide');
			}
		}

		modalClaims.open();
	}

	return init();
};

SDG.About.run();
