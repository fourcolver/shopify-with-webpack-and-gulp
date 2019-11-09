/**
 * get hidden height
 * @param {element}
 * @return {int}
 */
_.getHiddenStyles = function(el) {
	let $clone = el.cloneNode(true);
	let $parent = el.parentNode;
	let posVal = window.getComputedStyle($parent).position;
	let body = document.body;
	let docEl = document.documentElement;
	let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	let clientTop = docEl.clientTop || body.clientTop || 0;
	let $cloneInDom = null;
	let cloneHeight = null;
	let cloneOffsetTop;
	let clonePaddingTop = null;
	let clonePaddingBottom = null;
	let cloneRect;

	if (posVal === 'static') {
		$parent.style.position = 'relative';
	}

	// Add attribute to track element for deletion;
	$clone.setAttribute('data-clone', 'true');

	// Remove clone style attributes
	$clone.removeAttribute('style');

	// Append the new cloen to to the parent.
	$parent.appendChild($clone);

	// Select that new clone
	$cloneInDom = $parent.querySelector('[data-clone="true"]');

	// Display the clone with visibility hidden so that size can be retrieved.
	$cloneInDom.style.height = 'auto';
	$cloneInDom.style.display = 'block';
	$cloneInDom.style.visibility = 'hidden';
	$cloneInDom.style.position = 'absolute';

	// Get Height
	cloneHeight = $cloneInDom.offsetHeight;

	// Get Padding Top
	clonePaddingTop = window.getComputedStyle($cloneInDom).paddingTop;

	// Get Padding Bottom;
	clonePaddingBottom = window.getComputedStyle($cloneInDom).paddingBottom;

	// Get Rectangle
	cloneRect = $cloneInDom.getBoundingClientRect();

	// Get OffsetTop
	cloneOffsetTop = Math.round(cloneRect.top + scrollTop - clientTop);

	// Delete the clone
	$cloneInDom.remove();

	// Remove the position value added to the parent when its static.
	if (posVal === 'static') {
		$parent.style.position = '';
	}

	// Return values
	return {
		elHeight: cloneHeight,
		elOffsetTop: cloneOffsetTop,
		elPaddingTop: clonePaddingTop,
		elPaddingBottom: clonePaddingBottom
	};
};