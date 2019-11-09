/**
 * slide up
 * @param {element} DOM Element
 * @param {int} Animation timer
 */
_.slideUp = function(el) {
	if (el === undefined) el = null;

	if (el) {
		el.style.height = `${el.offsetHeight}px`;

		el.style.height = 0;
		el.style.paddingTop = 0;
		el.style.paddingBottom = 0;
	}
};

/**
 * slide down
 * @param {element} DOM Element
 * @param {int} Animation timer
 */
_.slideDown = function(el = null) {

	if (!el) return;

	const hiddenStyles = _.getHiddenStyles(el);
	const { elHeight, elPaddingTop, elPaddingBottom } = hiddenStyles;

	el.style.display = 'block';
	el.style.paddingTop = 0;
	el.style.paddingBottom = 0;
	el.style.height = 0;

	setTimeout(() => {
		el.style.height = `${elHeight}px`;
		el.style.paddingTop = elPaddingTop;
		el.style.paddingBottom = elPaddingBottom;
	}, 1);
};