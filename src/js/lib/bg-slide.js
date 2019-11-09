/**
 * Background Slide effect
 */
SDG.backgroundSlide = function(opts) {
	const config = {
		id: null,
		bg: 'js-bg-slide',
		offset: 500,
		timer: 250,
		cls: {
			background_set: 'bg-set',
			visible: 'is-visible',
			aim_photo: 'aim-photo'
		}
	};
	const c = _.extend(config, opts);
	const $container = document.getElementById(`${c.id}`);

	function init() {
		if ($container) {
			addEvents();
		}
	}

	function addEvents() {
		_.waypoint({
			el: $container,
			in: triggerParalax,
			offset: c.offset
		});
	}

	function triggerParalax() {
		const $bg = $container.querySelector(`.${c.bg}`);

		_.addClass($bg, c.cls.visible);

		setTimeout(showContent, c.timer);
	}

	function showContent() {
		_.addClass($container, c.cls.background_set);
	}


	return {
		init
	};

};

export default SDG.backgroundSlide;
