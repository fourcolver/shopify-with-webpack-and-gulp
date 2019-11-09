/**
 * bag count
 * @requires [lib/util.js,lib/bag-config.js]
 * namespace
 * bag config
 * count config
 * extend bag config
 * count
 */

/**
 * namespace
 * @type {Object}
 */
SDG.Bag = SDG.Bag || {};

/**
 * bag config
 * @type {Object}
 */
SDG.Bag.config = SDG.Bag.config || {};

/**
* count config
* @type {Object}
*/
SDG.Bag.config_count = {
	dom: {
		count: 'bagBtnCount',
		count_page: 'bagBtnCount',
		page: 'your-shopping-cart'
	}
};

/**
 * extend bag config
 * @type {Object}
 */
SDG.Bag.config = _.extend(SDG.Bag.config, SDG.Bag.config_count);

SDG.Bag.Count = {

	count: null,

	/**
	 * get
	 * @return {number} bag count (number of items in bag)
	 */
	get() {
		return this.count;
	},

	/**
	 * set
	 * @param {number|string} n number
	 */
	set(n) {
		const c = SDG.Bag.config;
		const $page = document.getElementById(c.dom.page);

		// ensure n is a number
		n = typeof n !== 'string' ? n : parseInt(n, 10);

		this.count = n;

		if ($page) {
			this.updateCount(c.dom.count_page, n);
		} else {
			this.updateCount(c.dom.count, n);
		}
	},
	updateCount(el, n) {
		let $count;
		let arr;
		let i;

		if (_.isDelimitedArray(el)) {
			arr = el.split(',');

			for (i = 0; i < arr.length; i += 1) {
				$count = document.getElementById(arr[i]);
				$count.innerHTML = n;

				if (n === 0) {
					$count.innerHTML = 0;
				}
			}
		} else {
			$count = document.getElementById(el);
			$count.innerHTML = n;

			if (n === 0) {
				$count.innerHTML = 0;
			}
		}
	}
};