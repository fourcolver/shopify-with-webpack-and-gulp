
/**
 * UTILS
 */
var _ = {};

/**
 * ajax
 * @param  {Object} opts
 * @return {_.ajax~init}
 */
_.ajax = function(opts) {
	var config = {
		cache: false,
		contentType: null,
		data: null,
		dataObject: {},
		headers: {},
		type: null,
		url: null,
		success: function(resp){
			console.log(resp);
		},
		error: function(resp) {
			console.warn(resp);
		}
	},

	c = _.extend(config,opts),
	url = c.cache ? c.url : c.url + '?ts=' + Date.now().toString(),
	xhr;

	/**
	 * init
	 */
	function init() {
		xhr = new XMLHttpRequest();
		xhr.open(c.type,url,true);
		setHeaders(xhr);
		xhr.onload = onLoadHandler;
		xhr.onError = errorHandler;

		if (c.data) {
			xhr.send(_.objectToQueryString(c.data));
		} else {
			if (c.dataObject) {
				xhr.send(_.objectToQueryString(c.dataObject));
			} else {
				console.warn('data is not defined.');
			}
		}
	}

	/**
	 * set headers
	 * @param {Object} xhr
	 */
	function setHeaders(xhr) {
		var defaultContentType = 'application/x-www-form-urlencoded; charset=UTF-8',
			contentType = c.contentType ? c.contentType : defaultContentType,
			headers = c.headers;

		if (! _.isObjectEmpty(headers)) {
			if (! hasContentType(headers)) {
				headers['Content-Type'] = defaultContentType;
			}
			Object.keys(headers).forEach(function(name) {
				xhr.setRequestHeader(name, headers[name]);
			});
		} else {
			xhr.setRequestHeader('Content-Type', contentType);
		}
	}

	/**
	 * has content type
	 * @param  {Object}  headers
	 * @return {Boolean}
	 */
	function hasContentType(headers) {

		return Object.keys(headers).some(function(name) {
			return name.toLowerCase() === 'content-type';
		});
	}

	/**
	 * on load handler
	 * @callback
	 */
	function onLoadHandler() {
		var resp = xhr.responseText;

		// check if response text is an object.
		if (typeof resp !== 'object') {
			try {
				resp = JSON.parse(resp);
			} catch(e) {
			}
		}

		// check xhr status
		if (xhr.status >= 200 && xhr.status < 400) {

			// check if response has a status code
			if (resp.status) {
				// check status code for success
				if (resp.status >= 200 && resp.status < 400) {
					c.success(resp);
				} else {
					c.error(resp);
				}
			} else {
				c.success(resp);
			}

		} else {
			c.error(resp);
		}
	}

	/**
	 * on load handler
	 * @callback
	 */
	function errorHandler() {
		c.error(xhr.responseText);
	}

	return init();
};

/**
 * serialize
 * @param form object
 */
_.serialize = function(form,type) {
	if (!form || form.nodeName !== 'FORM') {
		return;
	}

	var isDataObject = (type ? true : false);

	var i, j, q = [], o = {};
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === '') {
			continue;
		}
		switch (form.elements[i].nodeName) {
		case 'INPUT':
			switch (form.elements[i].type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'button':
			case 'reset':
			case 'submit':
			case 'color':
			case 'date':
			case 'datetime-local':
			case 'email':
			case 'month':
			case 'number':
			case 'range':
			case 'search':
			case 'tel':
			case 'time':
			case 'url':
			case 'week':
				q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
				o[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) {
					q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
					o[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
				}
				break;
			case 'file':
				break;
			}
			break;
		case 'TEXTAREA':
			q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
			o[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
			break;
		case 'SELECT':
			switch (form.elements[i].type) {
			case 'select-one':
				q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
				o[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
				break;
			case 'select-multiple':
				for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
					if (form.elements[i].options[j].selected) {
						q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value));

						o[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
					}
				}
				break;
			}
			break;
		case 'BUTTON':
			switch (form.elements[i].type) {
			case 'reset':
			case 'submit':
			case 'button':
				q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
				o[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
				break;
			}
			break;
		}
	}

	if (isDataObject) {
		return o;
	} else {
		return q.join('&');
	}
};
/**
 * extend
 * extends a js object
 * @param  {Object} config
 * @param  {Object} obj
 * @return {Object}
 */
_.extend = function(config, obj) {
	obj = obj || {};

	Object.keys(config).forEach(function(key) {
		if (obj[key] === undefined) {
			obj[key] = config[key];
		} else {
			if (obj[key] && _.isObject(obj[key])) {
				Object.keys(config[key]).forEach(function(childKey) {
					if (obj[key][childKey] === undefined) {
						obj[key][childKey] = config[key][childKey];
					}
				});
			}
		}
	});

	return obj;
};
/**
 * is object
 * @param  {*}       data any type
 * @return {boolean}
 */
_.isObject = function(data) {
	return Object.prototype.toString.call(data) === '[object Object]';
};

/**
 * is object empty
 * @param  {Object}  obj
 * @return {boolean}
 */
_.isObjectEmpty = function(obj) {
	return _.isObject(obj) && Object.keys(obj).length === 0;
};

/**
 * object to query string
 * if no object is provided, function will return original data
 * @param  {Object} data
 * @return {string}
 */
_.objectToQueryString = function(data) {
	return _.isObject(data) ? _.getQueryString(data) : data;
};
/**
 * End
 */

var btn = document.getElementById('pwdBtn');
var body = document.getElementsByTagName('body')[0];
var input = document.getElementById('password');
var $formHeader = document.getElementById('formHeader');
var $formSuccess = document.getElementById('formSuccess');
var $form = document.getElementById('newsletterSignUp');
var $email = document.getElementById('email');
var $messages = document.getElementById('messages');
var $msgSuccess = document.getElementById('messageSuccess');
var $msgError = document.getElementById('messageError');

btn.addEventListener("click", function(){
	body.className = 'form-visible';
	input.focus();
});

$form.addEventListener("submit", function(e) {
	var ajaxUrl = this.getAttribute('data-ajax-submit');
	var data = _.serialize($form, true);

	e.preventDefault();
	$messages.style.display = "none";

	if (validateEmail($email.value)) {
		_.ajax({
			contentType: 'application/json',
			dataObject: JSON.stringify(data),
			error: onError,
			success: onSuccess,
			type: 'POST',
			url: ajaxUrl
		});
	} else {
		$messages.style.display = "block";
		$msgError.style.display = "block";
		$msgSuccess.style.display = "none";
	}


});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function onSuccess(response) {

	// show messages
	$form.style.display = "none";
  	$formHeader.style.display = "none";
  	$formSuccess.style.display = "block";

}

function onError(response) {
	console.log(response);
}