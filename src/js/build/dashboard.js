/**
 * Dashboard
 *
 * namespace
 * config
 * instances
 * run dom ready
 * message
 * init
 * fire functions
 */

/**
 * Account namespace
 * @type {Object}
 */
SDG.Dashboard = SDG.Dashboard || {};

/**
 * config
 * @type {Object}
 */
SDG.Dashboard.config = {

	// classes
	cls: {
		active: 'is-active',
		content_active: 'content-is-active',
		loading: 'is-loading',
	},

	// ids
	id: {
		content: 'acContent',
	},

	// selectors
	s: {
		submit_btn: '.js-submit-btn'
	},

	// view model
	vm: {
		dashboard: '#acDashboard',
		msg: '#acMsg'
	}
};

/**
 * instances
 */

// view model instances
SDG.Dashboard.Vm = {};
SDG.Dashboard.VmMsg = {};

// message instance
SDG.Dashboard.Message = {};

/**
 * run dom ready
 * @type {Function}
 */
SDG.Dashboard.runDomReady = function() {

	_.ready(function() {

		// messages
		SDG.Dashboard.Message = SDG.Dashboard.message();
		SDG.Dashboard.Message.init();

		// dashboard
		SDG.Dashboard.init();
	});
};

/**
 * message
 * @param  {Object} opts
 * @return {Object}
 */
SDG.Dashboard.message = function(opts) {
	var c = {
		expire: true,
		target: SDG.Dashboard.config.vm.msg,
		timeout: null, // timeout variable
		timer: 8000
	};

	/**
	 * init
	 */
	function init() {
		initViewModel();
	}

	/**
	 * init view model
	 */
	function initViewModel() {

		/**
		 * message view model
		 * @type {Vue}
		 */
		SDG.Dashboard.VmMsg = new Vue({
			el: c.target,
			data: {
				show: false,
				text: '',
				type: ''
			},
			computed: {
				messageTypeClass: function() {
					return {
						'message--success': this.type === 'success' ? true : false,
						'message--error': this.type === 'error' ? true : false
					};
				}
			}
		});
	}

	/**
	 * update
	 * @param  {Object} opts optional props - text: string, type: success|error,
	 *                       show: true|false
	 */
	function update(opts) {

		// loop through props
		Object.keys(opts).forEach(function(prop) {
			updateOption(opts, prop);
		});

		// if set to expire, and show has been flagged
		if (c.expire && opts.show) {
			clearTimer();
			setTimer();
		}
	}

	/**
	 * update option
	 * @param {Object} opts
	 * @param {string} prop
	 */
	function updateOption(opts, prop) {
		var val = opts[prop],
			propAndValueExist = prop in SDG.Dashboard.VmMsg && val !== 'undefined';

		// update view model's data with value
		if (propAndValueExist) {
			SDG.Dashboard.VmMsg[prop] = val;
		}
	}

	/**
	 * hide
	 */
	function hide() {
		SDG.Dashboard.VmMsg.show = false;
	}

	/**
	 * set timer
	 */
	function setTimer() {
		c.timeout = setTimeout(hide, c.timer);
	}

	/**
	 * clear timer
	 */
	function clearTimer() {
		clearTimeout(c.timeout);
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init: init,
		update: update
	};
};

/**
 * init
 * @return {SDG.Dashboard.init~init}
 */
SDG.Dashboard.init = function() {
	var c = SDG.Dashboard.config,
		addressCookie = {
			added: {
				exdays: 1000,
				name: 'address_added',
				value: 'set'
			},
			deleted: {
				exdays: 1000,
				name: 'address_deleted',
				value: 'set'
			},
			edited: {
				exdays: 1000,
				name: 'address_edited',
				value: 'set'
			}
		},

		// check for cookies
		isCookieSet = {
			addressAdded: SDG.getCookie(addressCookie.added.name) === addressCookie.added.value,
			addressEdited: SDG.getCookie(addressCookie.edited.name) === addressCookie.edited.value,
			addressDeleted: SDG.getCookie(addressCookie.deleted.name) === addressCookie.deleted.value
		},

		// define global mixins
		mixinCommon,
		mixinForm,
		mixinMainView,
		mixinPagination,

		// cached globals
		currentView = 'info';

	/**
	 * init
	 */
	function init() {
		detectUrl();
		setCurrentView();
		initMixins();
		initComponents();
		initViewModel();
		displayMessage();
	}

	/**
	 * detect url
	 */
	function detectUrl() {
		var isAddressesPage = window.location.href.indexOf('/addresses') !== -1;

		// if url contains '/addresses' (on address book page)
		if (isAddressesPage) {

			// remove addresses from url
			history.pushState('', document.title, '/account');
		}
	}

	/**
	 * set current view
	 */
	function setCurrentView() {
		var isAddressCookieSet = isCookieSet.addressAdded || isCookieSet.addressEdited || isCookieSet.addressDeleted;

		if (isAddressCookieSet) {
			currentView = 'address-book';
		}
	}

	/**
	 * init mixins
	 */
	function initMixins() {

		/**
		 * common/utilities mixin (included in all components)
		 * @type {Object}
		 */
		mixinCommon = {

			activated: function() {
				var component = this,
					data = component.componentDataToSet;

				// if component has data to set
				if (data) {
					Object.keys(data).forEach(function(key) {
						component[key] = SDG.Dashboard.Vm[data[key]];
					});
				}
			},

			methods: {

				/**
				 * set view model data
				 * @param {string} viewModelProp prop name
				 * @param {Object} data          data object to be set
				 * @param {string} view          view to transition to
				 */
				setViewModelData: function(viewModelProp, data, view) {
					SDG.Dashboard.Vm[viewModelProp] = data;
					SDG.Dashboard.Vm.currentView = view;
				},

				/**
				 * remove content active class
				 */
				removeContentActiveClass: function() {
					_.removeClass(this.$parent.$el, c.cls.content_active);
				},

				/**
				 * set view
				 */
				setView: function(view) {
					SDG.Dashboard.Vm.currentView = view;
				}
			}
		};

		/**
		 * form mixin
		 * @type {Object}
		 */
		mixinForm = {

			methods: {

				/**
				 * init placeholders
				 */
				initPlaceholders: function() {
					SDG.placeholder().init();
				},

				/**
				 * on submit
				 * @param {Object} e event
				 */
				onSubmit: function(e) {
					var form = e.target;

					// set cookie
					this.setCookie();

					// submit form
					form.submit();
				},

				/**
				 * set cookie
				 */
				setCookie: function() {
					var cookie = this.cookie;

					SDG.setCookie(cookie.name, cookie.value, cookie.exdays);
				}
			}
		};

		/**
		 * main view mixin (My Info, Order History, Address Book)
		 * @type {Object}
		 */
		mixinMainView = {

			methods: {

				/**
				 * on back click
				 */
				onBackClick: function() {
					this.removeContentActiveClass();
				}
			}
		};

		/**
		 * pagination mixin (Order History, Address Book)
		 * @type {Object}
		 */
		mixinPagination = {

			computed: {
				paginatedItems: function() {
					var index = this.paginationOptions.currentPage * this.paginationOptions.itemsPerPage;

					// return filtered items
					return this.items.slice(index, index + this.paginationOptions.itemsPerPage);
				}
			}
		};
	}

	/**
	 * init components
	 */
	function initComponents() {

		/**
		 * info
		 * @type {Component}
		 */
		Vue.component('info', {
			template: '#info-template',
			mixins: [mixinCommon, mixinMainView],

			data: function() {
				return {
					sectionHeaderOptions: {
						isPhoneOnly: true
					},
					sectionHeaderTitle: 'My Info',
					submitBtn: ''
				};
			},

			methods: {

				/**
				 * on password reset submit
				 * @param {Object} e event
				 */
				onPasswordResetSubmit: function(e) {
					var form = e.target;

					// set submit button
					this.submitBtn = form.querySelector(c.s.submit_btn);

					// disable button
					this.disableSubmitButton();

					// init ajax
					this.initAjaxSubmit(form);
				},

				/**
				 * init ajax submit
				 */
				initAjaxSubmit: function(form) {
					var data = _.serialize(form),
						url = form.getAttribute('action');

					// init ajax call
					_.ajax({
						data: data,
						error: this.submitError,
						success: this.submitSuccess,
						type: 'POST',
						url: url
					});
				},

				/**
				 * disable submit button
				 */
				disableSubmitButton: function() {
					this.submitBtn.disabled = true;
					_.addClass(this.submitBtn, c.cls.loading);
				},

				/**
				 * enable submit button
				 */
				enableSubmitButton: function() {
					this.submitBtn.disabled = false;
					_.removeClass(this.submitBtn, c.cls.loading);
				},

				/**
				 * submit error
				 */
				submitError: function(resp) {
					console.log(resp);

					// init message
					SDG.Dashboard.Message.update({
						show: true,
						text: 'We\'re sorry, but there\'s a problem with this feature right now. Please try again later or try directly on the <a href="/account/login#recover">password reset page</a>.',
						type: 'error'
					});

					// enable button
					this.enableSubmitButton();
				},

				/**
				 * submit success
				 */
				submitSuccess: function(resp) {

					// init message
					SDG.Dashboard.Message.update({
						show: true,
						text: 'We\'ve sent you an email with a link to update your password.',
						type: 'success'
					});

					// enable button
					this.enableSubmitButton();
				}
			}
		});

		/**
		 * order history
		 * @type {Component}
		 */
		Vue.component('order-history', {
			template: '#order-history-template',
			mixins: [mixinCommon, mixinMainView, mixinPagination],

			data: function() {
				return {
					items: accountOrders,
					paginationOptions: {
						currentPage: 0,
						itemsPerPage: 10
					},
					sectionHeaderOptions: {
						isPhoneOnly: true
					},
					sectionHeaderTitle: 'Order History'
				};
			},

			computed: {
				hasOrders: function() {
					return this.items.length > 0 ? true : false;
				}
			}
		});

		/**
		 * address book
		 * @type {Component}
		 */
		Vue.component('address-book', {
			template: '#address-book-template',
			mixins: [mixinCommon, mixinMainView, mixinPagination],

			data: function() {
				return {
					items: accountAddresses,
					paginationOptions: {
						currentPage: 0,
						itemsPerPage: 5
					},
					sectionHeaderOptions: {
						isPhoneOnly: true
					},
					sectionHeaderTitle: 'Address Book',
				};
			}
		});

		/**
		 * address item
		 * @type {Component}
		 */
		Vue.component('address-item', {
			template: '#address-item-template',
			props: ['address'],
			mixins: [mixinCommon, mixinForm],

			data: function() {
				return {
					cookie: addressCookie.deleted
				};
			},

			computed: {
				addressFormat: function() {
					var address = this.address;

					return '<p>' +
						address.name + '<br />' +
						(address.company ? address.company + '<br />' : '') +
						(address.address1 ? address.address1 + '<br />' : '') +
						(address.address2 ? address.address2 + '<br />' : '') +
						address.city + ' ' +
						address.province_code + ' ' +
						address.zip + '<br />' +
						address.country +
					'</p>';
				}
			},

			methods: {

				/**
				 * destroy address
				 * @param {Object} e  event
				 * @param {string} id address id
				 */
				destroyAddress: function(e, id) {
					var msg = e.target.getAttribute('data-confirm-message'),
						msgDefault = 'Are you sure you wish to delete this address?';

					msg = msg || msgDefault;

					if (confirm(msg)) {

						// set cookie
						// @see mixinForm
						this.setCookie();

						// post link
						Shopify.postLink('/account/addresses/' + id, {
							'parameters': {
								'_method': 'delete'
							}
						});
					}
				}
			}
		});

		/**
		 * address edit
		 * @type {Component}
		 */
		Vue.component('address-edit', {
			template: '#address-edit-template',
			mixins: [mixinCommon, mixinForm],

			data: function() {
				return {
					address: {},
					componentDataToSet: {
						address: 'currentAddressEdit',
					},
					cookie: addressCookie.edited,
					sectionHeaderOptions: {
						isSub: true
					}
				};
			},

			updated: function() {

				// placeholders
				// @see mixinForm
				this.initPlaceholders();

				// shopify province selector
				new Shopify.CountryProvinceSelector('addressEditCountry', 'addressEditProvince', {
					hideElement: 'addressEditProvinceContainer'
				});
			},

			computed: {
				formAction: function() {
					return '/account/addresses/' + this.address.id;
				},
				sectionHeaderTitle: function() {
					return 'Edit Address ' + this.address.displayIndex;
				}
			},

			methods: {

				/**
				 * on back click
				 */
				onBackClick: function() {
					this.setView('address-book');
				}
			}
		});

		/**
		 * address new
		 * @type {Component}
		 */
		Vue.component('address-new', {
			template: '#address-new-template',
			mixins: [mixinCommon, mixinForm],

			data: function() {
				return {
					cookie: addressCookie.added,
					sectionHeaderOptions: {
						isSub: true
					},
					sectionHeaderTitle: 'New Address'
				};
			},

			mounted: function() {

				// placeholders
				// @see mixinForm
				this.initPlaceholders();

				// shopify province selector
				new Shopify.CountryProvinceSelector('addressNewCountry', 'addressNewProvince', {
					hideElement: 'addressNewProvinceContainer'
				});
			},

			methods: {

				/**
				 * on back click
				 */
				onBackClick: function() {
					this.setView('address-book');
				}
			}
		});

		/**
		 * section header
		 * @type {Component}
		 */
		Vue.component('section-header', {
			template: '#section-header-template',
			props: ['backClick', 'description', 'options', 'title']
		});

		/**
		 * pagination
		 * @type {Component}
		 */
		Vue.component('pagination', {
			template: '#pagination-template',

			props: {
				items: {
					type: Array,
					required: true
				},
				options: {
					type: Object,
					required: true
				}
			},

			computed: {
				show: function() {
					return this.items.length > this.options.itemsPerPage ? true : false;
				},
				totalPages: function() {
					return Math.ceil(this.items.length / this.options.itemsPerPage);
				}
			},

			methods: {

				/**
				 * set page
				 * @param {number} n page number
				 */
				setPage: function(n) {
					this.options.currentPage = n - 1;
				},

				/**
				 * set link class
				 * @param {number} n page number
				 */
				setLinkClass: function(n) {
					return {
						'is-active': this.options.currentPage === n - 1,
						'to-first': (n === 1 && Math.abs(n - this.options.currentPage - 1) > 3),
						'to-last': (n === this.totalPages && Math.abs(n - this.options.currentPage - 1) > 3)
					};
				},

				/**
				 * should display link
				 * @param {number} n page number
				 */
				shouldDisplayLink: function(n) {
					var isLessThanThreshold = Math.abs(n - this.options.currentPage - 1) < 3,
						isFirst = n === 1,
						isLast = n === this.totalPages;

					return isLessThanThreshold || isFirst || isLast ? true : false;
				}
			}
		});
	}

	/**
	 * init view model
	 */
	function initViewModel() {

		SDG.Dashboard.Vm = new Vue({
			el: c.vm.dashboard,

			data: {
				currentAddressEdit: {},
				currentView: currentView
			},

			mounted: function() {
				this.removeLoadingClass();
			},

			methods: {

				/**
				 * add content active class
				 */
				addContentActiveClass: function() {
					var el = this.$el;

					setTimeout(function() {
						_.addClass(el, c.cls.content_active);
					}, 50);
				},

				/**
				 * is view
				 * @param  {string}  views name of views, comma delimited
				 * @return {boolean}
				 */
				isView: function(views) {
					var vm = this;

					views = views.indexOf(',') !== -1 ? views.split(',') : [views];

					return views.some(function(view) {
						return view === vm.currentView;
					});
				},

				/**
				 * remove loading class
				 */
				removeLoadingClass: function() {
					_.removeClass(this.$el, c.cls.loading);
				},

				/**
				 * set main view
				 * @param {string} view component name, i.e. 'address-book'
				 */
				setMainView: function(view) {
					this.currentView = view;

					// add content active class if phone view
					_.mq({
						callback: this.addContentActiveClass,
						view: 'phone'
					});
				}
			}
		});
	}

	/**
	 * display message
	 */
	function displayMessage() {
		var msg;

		// check which cookie is set, set msg appropriately, delete cookie

		// address added
		if (isCookieSet.addressAdded) {
			msg = 'Address has been successfully added.';
			SDG.deleteCookie(addressCookie.added.name);
		}

		// address edited
		else if (isCookieSet.addressEdited) {
			msg = 'Address has been successfully updated.';
			SDG.deleteCookie(addressCookie.edited.name);
		}

		// address deleted
		else if (isCookieSet.addressDeleted) {
			msg = 'Address has been successfully deleted.';
			SDG.deleteCookie(addressCookie.deleted.name);
		}

		// no cookies, exit function
		else {
			return;
		}

		// show/update message
		SDG.Dashboard.Message.update({
			text: msg,
			type: 'success',
			show: true
		});
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init: init()
	};
};

/**
 * fire functions
 */
require([path.vue], function(Vue) {
	window.Vue = Vue;
	Vue.options.delimiters = ['${', '}'];
	SDG.Dashboard.runDomReady();
});