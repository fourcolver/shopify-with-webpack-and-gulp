/**
* input placeholder
* @requires [lib/util.js]
* @return   {Object}
*/
var hideLabelsOnFocus = function() {

	var input = $('input, textarea');

	input.on('keyup', function(){
		id = $(this).attr('name')
		val = $(this).val()
		label = $('label[for="' + id + '"]');
		if($(this).val() ){
			label.css('opacity', '0');
		}
		else
		{
			label.css('opacity', '1');
		}
	});

};
hideLabelsOnFocus()

SDG.placeholder = function(opts) {
	const config = {
		id: 'main',
		sel: 'input-placeholder',
		cls: 'has-value'
	};
	const c = _.extend(config, opts);

	// cached globals
	placeHoldWrap = $('.input-placeholder')
	const domId = document.getElementById(c.id);
	const domInputWraps = domId.querySelectorAll('.input-placeholder');
	let domInputWrap;
	let domInput;

	/**
	* init
	* @return {Function}
	*/
	function init() {
		addEvents();
		checkForExistingValues();
	}

	/**
	* add events
	* @return {Function}
	*/
	function addEvents() {

		// keyup event for inputs
		_.addEvent({
			id: c.id,
			className: `${c.sel} input`,
			event: 'keyup',
			fn: checkValue
		});

		// change event for inputs
		_.addEvent({
			id: c.id,
			className: `${c.sel} input`,
			event: 'change',
			fn: checkValue
		});

		// keyup event for textarea
		_.addEvent({
			id: c.id,
			className: `${c.sel} textarea`,
			event: 'keyup',
			fn: checkValue
		});

		// change event for textarea
		_.addEvent({
			id: c.id,
			className: `${c.sel} textarea`,
			event: 'change',
			fn: checkValue
		});
	}

	/**
	* check for existing values
	* @type {Function}
	*/
	function checkForExistingValues() {
		Object.keys(domInputWraps).forEach((key) => {
			domInputWrap = domInputWraps[key];
			if (_.isObject(domInputWrap)) {
				domInput = (domInputWrap.querySelector('input') ? domInputWrap.querySelector('input') : domInputWrap.querySelector('textarea'));
			}

			if (domInput) {
				checkValue(domInput);
			}
		});
	}

	/**
	* check value
	* @type {Function}
	*/
	function checkValue(el) {
		const field = el.target ? el.target : el;

		if (field.value && field.value !== '') {
			_.addClass(field.parentNode, c.cls);
		} else {
			_.removeClass(field.parentNode, c.cls);
		}
	}

	/**
	* return
	* @type {Object}
	*/
	return {
		init,
		refresh: checkForExistingValues
	};
};
