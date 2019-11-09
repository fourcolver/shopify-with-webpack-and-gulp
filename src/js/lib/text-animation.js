/**
 * Text animation for paralax effect
 */

SDG.textAnimation = function(opts) {
	const config = {
		id: null,
		cls: {
			content: 'js-text-animate',
			visible: 'is-visible'
		},
		offset: 500
	};

	const c = _.extend(config, opts);
	const $container = document.getElementById(c.id);
	const $content = $container.querySelectorAll(`.${c.cls.content}`);

	function init() {
		if ($container) {
			addEvents();
		}
	}

	function addEvents() {
		_.waypoint({
			el: $container,
			in: triggerAnimation,
			offset: c.offset
		});
	}

	function triggerAnimation() {
		Array.prototype.forEach.call($content, (el) => {
			_.addClass(el, c.cls.visible);
		});
	}

	return {
		init
	};
};

export default SDG.textAnimation;