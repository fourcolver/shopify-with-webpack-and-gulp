SDG.shadeInfo = SDG.shadeInfo || {};

SDG.shadeInfo.config = {
	dom: {
		trigger: 'shadeInfoTrigger',
		tab_left: 'leftTabBtn',
		tab_right: 'rightTabBtn',
		link: 'pv-link',
		link_list: 'pvLinksList',
		shade_list: 'pvTabsList',
		shade_btn: 'js-shade-trigger',
		shade_modal: 'js-shade-modal'
	},
	modal: {
		id: 'shadeIngredientsModal',
		overlay: 'shadeIngredientsOverlay'
	},
	offset: 134
};

SDG.shadeInfo.init = function(opts) {

	const c = _.extend(SDG.shadeInfo.config, opts);

	// globals
	const $tabList = document.getElementById(c.dom.shade_list);
	const tabs = document.getElementById('pvTabs');
	const $tabLeft = document.getElementById(c.dom.tab_left);
	const $tabRight = document.getElementById(c.dom.tab_right);
	const $modal = document.getElementById(c.modal.id);
	const $modalContents = $modal.querySelectorAll(`.${c.dom.shade_modal}`);

	// shade modal
	const modalOptsShade = {
		dom: {
			modal_id: c.modal.id,
			overlay: c.modal.overlay
		}
	};
	const modalShade = SDG.Modal.init(modalOptsShade);

	// tabs accordion
	const pvTabs = SDG.accordion({
		dom: {
			btn: 'js-tab-btn',
			id: 'pvTabs',
			menu: 'js-tabs-menu'
		},
		open_option: 0,
		close_on_trigger_click: false
	});

	// shade list accordion
	const pvTabsList = SDG.accordion({
		dom: {
			btn: 'js-tablist-btn',
			id: 'pvTabsList',
			menu: 'js-tablist-menu'
		},
		responsive: true,
		views: {
			active: ['mobile'], // {array}
			inactive: ['desktop']
		},
	});

	function init() {
		if ($tabList) {

			// shade modal
			modalShade.init();

			// tabs
			if (tabs) {
				pvTabs.init();
				pvTabsList.init();
			}
		}

		addEvents();
	}

	function addEvents() {
		openLeftTab();
		openRightTab();

		_.addEvent({
			id: c.dom.shade_list,
			className: c.dom.shade_btn,
			event: 'click',
			fn: openShadeModal
		});

	}

	function openLeftTab() {
		_.scrollTo({
			id: c.dom.link_list,
			className: c.dom.link,
			offset: c.offset * -1,
			callback: () => {
				if ($tabLeft) {
					$tabLeft.click();
				}

			}
		});
	}

	function openRightTab() {
		_.scrollTo({
			id: c.dom.trigger,
			offset: c.offset * -1,
			target: c.dom.tab_right,
			callback: () => {
				if ($tabRight) {
					$tabRight.click();
				}
			}
		});
	}

	function openShadeModal(e) {

		const shade = e.target.getAttribute('data-shade');

		for (let i = 0; i < $modalContents.length; i += 1) {
			const shadeModal = $modalContents[i].getAttribute('data-shade-modal');

			if (shade === shadeModal) {
				_.removeClass($modalContents[i], 'hide');
			} else {
				_.addClass($modalContents[i], 'hide');
			}
		}

		modalShade.open();
	}

	return {
		init
	};
};

export default SDG.shadeInfo.init;
