SDG.GridSwatch = SDG.GridSwatch || {};

SDG.GridSwatch.config = {
	dom: {
		id: 'main',
		class: '.pi',
		swatch: 'swatch-element',
		new_shade: 'new-shade'
	},
	cls: {
		active: 'is-active'
	}
};


SDG.GridSwatch.changeImage = function(opts) {

	//add active class to first li in color swatch list.
	$('.pi__swatches').each(function(){
		firstLi = $(this).find('li:first');
		firstLi.addClass('is-active');
	});

	const c = _.extend(SDG.GridSwatch.config, opts);

	// globals
	const $main = document.getElementById('main');
	let qv;
	let item;
	let prevImgWrapper;

	function init() {
		addEvents();
	}

	function addEvents() {
		_.addEvent({
			id: c.dom.id,
			className: c.dom.swatch,
			event: 'click',
			fn: showImage
		});
	}

	// when the user swaps colors, update the variant ID on the add-to-cart btn.
	function swapVariantId(selectedVariant, updateVariantTarget) {
		$(updateVariantTarget).attr('data-variant-id', selectedVariant);
	}

	function showImage(e) {
		const el = e.currentTarget;
		const $els = document.querySelectorAll(`.${c.dom.swatch}`);
		const $parents = el.parentNode.parentNode.parentNode.parentNode; // _.parents(el, '.pi');
		const $newShade = $parents.querySelector(`.${c.dom.new_shade}`);
		const imgUrl = this.dataset.img;
		const imgAlt = this.dataset.value;
		let i;

		var selectedVariant = $(e.currentTarget).data('variant-id');
		var selectedHandle = $(e.currentTarget).data('handle')
		var updateVariantTarget = $('.plp-add-to-bag[data-handle="'+ selectedHandle +'"]');
		swapVariantId(selectedVariant,updateVariantTarget);

		if (imgAlt === 'Glow Down') {
			_.show($newShade);
		} else {
			_.hide($newShade);
		}

		if (_.parents(this, c.dom.class)) {
			item = _.parents(this, c.dom.class)[0];
		} else if (!_.parents(this, '#essential')) {
			qv = $main.querySelector(c.dom.id);
			item = qv.querySelector(c.dom.class);
		}

		prevImgWrapper = item.querySelector('.ir');

		for (i = 0; i < $els.length; i += 1) {
			_.removeClass($els[i], c.cls.active);
		}

		_.addClass(prevImgWrapper, 'is-loading');
		_.addClass(el, c.cls.active);
		prevImgWrapper.innerHTML = `<img class="lazyload" data-src="${imgUrl}" alt="${imgAlt}" />`;
	}

	return init();
};
SDG.GridSwatch.changeImage();
