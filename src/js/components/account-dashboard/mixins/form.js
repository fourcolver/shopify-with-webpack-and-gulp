/**
 * form
 * @type {Object}
 */
const form = {

	methods: {

		/**
		 * fill country select
		 * @param {String} id select's id
		 */
		fillCountrySelect(id) {
			const $el = document.getElementById(id);

			// fill country select with Shopify options
			$el.innerHTML = this.countryOptionTags;
		},

		/**
		 * init placeholders
		 */
		initPlaceholders() {
			SDG.placeholder().init();
		},

		/**
		 * on submit
		 * @param {Object} e event
		 */
		onSubmit(e) {
			const $form = e.target;

			// set cookie
			this.setCookie();

			// submit form
			$form.submit();
		},

		/**
		 * set cookie
		 */
		setCookie() {
			const cookie = this.cookie;

			SDG.setCookie(cookie.name, cookie.value, cookie.exdays);
		},
	}
};

export default form;