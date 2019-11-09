/**
 * Smooth scroll
 * @param  options [target: where you want the link to scroll to, link: the link you want to target with an ID ]
 */
_.scrollTo = function(opts) {
 	let config = {
			callback: null,
			className: null,
			exec_now: false,
			id: null,
			offset: 0,
			target: null,
			timer: 500
 	},

 	c = _.extend(config, opts);

 	function init () {


		if (c.exec_now) {
			scroll();
		} else {
			if (c.id) {
				addEvents();
			} else {
				console.warn('no id defined');
			}
		}
 	}

 	function addEvents () {
		_.addEvent({
			id: c.id,
			className: c.className,
			event: 'click',
			fn: scroll
		});
 	}

	function scroll(e) {

		let start = window.pageYOffset,
			target = c.target ? c.target : this.getAttribute('href').replace('#',''),
			distance,
			duration,
			timeStart,
			timeElapsed,
			offsetVal;

		target = typeof target === 'string' ? document.getElementById(target) : target;

		if (target) {
			if (e) {
				e.preventDefault();
			}
		} else {
			return false;
		}

		offsetVal = typeof c.offset === 'function' ? c.offset() : c.offset;

		distance = offsetVal + target.getBoundingClientRect().top;

		duration = typeof c.timer === 'function' ? c.timer(distance) : c.timer;

		requestAnimationFrame(function(time) { timeStart = time; loop(time); });

		function loop(time) {
			timeElapsed = time - timeStart;

			window.scrollTo(0, easeInOutQuad(timeElapsed, start, distance, duration));

			if (timeElapsed < duration){
				requestAnimationFrame(loop);
			} else {
				end();
			}
		}

		function end() {
			window.scrollTo(0, start + distance);

			if (typeof c.callback === 'function'){
				c.callback();
			}
		}
 	}

	// Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
	function easeInOutQuad(t, b, c, d)  {
		t /= d / 2;
		if(t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

 	return init();
};