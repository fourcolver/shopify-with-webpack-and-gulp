/**
* namespace
* @type {Object}
*/
SDG.Modal = SDG.Modal || {};

/**
* get modal html
* @type {Function}
*/
SDG.Modal.getHtml = function(opts) {
	const config = {
		close_icon: 'close',
		html: null,
		modal: null,
		modifier: null,
		overlay: null,
		attach: true
	};

	// extended config
	const c = _.extend(config, opts);

	// cached globals
	const $page = document.getElementById('maincontent');
	let html;

	/**
	* get html
	* @type {Function}
	* @return {String}
	*/
	function init() {
		html = getHtml();

		if (c.attach) {
			addToDom();
		} else {
			return html;
		}

		return undefined;
	}

	function getHtml() {
		html = `
		'<aside id="${c.modal}" class="js-generated-modal modal${c.modifier ? ` modal--${c.modifier} ${c.modifier}` : ''}>
			<div class="modal__inner ${c.modifier ? ` modal__inner--'${c.modifier}` : ''}>
				<button type="button" class="btn-icon modal__close js-modal-close">
					<i class="icon icon--${c.close_icon}"></i>
					<span class="screenreader">Close</span>
				</button>
				<div id="${c.modifier ? `${c.modifier}ModalContent` : 'genModalContent'}" class="modal__loaded-content">
					${c.html ? c.html : ''}
				</div>
			</div>
		</aside>
		'<div id="'+ c.overlay +'" class="modal-overlay">';
		`;

		return html;
	}

	function addToDom() {
		const $modal = document.createElement('div');
		const $modalCheck = document.getElementById(config.modal); // check for existing modal

		// Attach modal html to $modal element
		$modal.innerHTML = html;

		// If the modal doesn't already exist, append the modal to the page-wrap
		if (!$modalCheck) $page.appendChild($modal);
	}

	/**
	* return object
	*/
	if (typeof opts !== 'undefined') {
		return init();
	}

	return undefined;
};