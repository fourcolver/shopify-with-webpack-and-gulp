/**
 * ajax
 * @param  {Object} opts
 * @return {_.ajax~init}
 */
_.ajax = function(opts,args) {
	const config = {
		cache: false,
		contentType: null,
		data: '',
		dataObject: {},
		headers: {},
		type: null,
		url: null,
		widthCredentials: false,
		success: function(resp){
			console.warn(resp);
		},
		error: function(resp) {
			console.warn(resp);
		}
	};

	const passedData = typeof(args) === 'undefined' ? null : args;
	let url;
	let c;
	let xhr;
	let timestamp = '?ts=';

	/**
	 * init
	 */
	function init() {
		c = _.extend(config,opts);
		if (c.url.indexOf('?') > -1) {
			timestamp = '&ts=';
		}
		url = c.cache ? c.url : c.url + timestamp + Date.now().toString();

		xhr = new XMLHttpRequest();
		xhr.open(c.type,url,true);
		setHeaders(xhr);
		xhr.onload = onLoadHandler;
		xhr.onError = errorHandler;
		xhr.withCredentials = c.withCredentials;

		if (c.data) {
			xhr.send(_.objectToQueryString(c.data));
		} else {
			if (c.dataObject) {
				xhr.send(c.dataObject);
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
		let defaultContentType = 'application/x-www-form-urlencoded; charset=UTF-8',
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

		let resp = xhr.responseText;

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
				if ((resp.status >= 200 && resp.status < 400) || resp.status === 'success') {
					c.success(resp, args);
				} else {
					c.error(resp, args);
				}
			} else {
				c.success(resp, args);
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