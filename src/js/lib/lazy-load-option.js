window.lazySizesConfig = window.lazySizesConfig || {};

function sdgRemoveLazy(el) {
	const cls = 'is-loading';
	const elm = _.parents(el, `.${cls}`);

	if (elm) {
		_.removeClass(elm[0], cls);
	}
}

document.addEventListener('lazybeforeunveil', e => sdgRemoveLazy(e.target));