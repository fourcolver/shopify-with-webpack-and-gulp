/**
* Global UI
*/
SDG.GlobalUI = (function() {

	/**
	 * init
	 */
	function init() {

		SDG.Header.init();

		// bag
		SDG.Bag.init();

		// bag add on
		if (themeSettings.productAddOn.enable) {
			SDG.Bag.productAddOn();
		}

		// newsletter footer
		SDG.Newsletter.form({
			hide_form_on_success: false,
			hide_messages_on_success: false,
			message_opts: {
				animation: {
					type: 'slideDown'
				}
			},
			namespace: 'footer'
		});

	}

	return init();
}());