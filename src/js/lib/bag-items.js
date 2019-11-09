/**
 * bag - items
 * this object provides useful methods to
 * add, remove, update, and get bag items to/from the global bagItems array
 * @type {Object}
 */
SDG.Bag.Items = {

	/**
	 * add
	 * adds an object to the global bagItems array
	 * @param {Object} obj
	 */
	add(obj) {
		bagItems.push(obj);
	},

	/**
	 * remove
	 * deletes an object from the global bagItems array
	 * @param {number} variantId [description]
	 */
	remove(variantId) {
		variantId = _.toNumber(variantId);

		bagItems = bagItems.filter(obj => obj.id !== variantId);
	},

	/**
	 * update
	 * updates a bag item's property value (the object key's value)
	 * @param {number}        variantId
	 * @param {string}        prop
	 * @param {number|string} value
	 */
	update(variantId, prop, value) {
		const item = this.filterArray(variantId);

		item[prop] = value;
	},

	/**
	 * get
	 * gets a bag item's property value
	 * @param  {number} variantId
	 * @return {number|string|boolean}
	 */
	get(variantId, prop) {
		const item = this.filterArray(variantId);

		return typeof item !== 'undefined' ? item[prop] : false;
	},

	/**
	 * empty
	 * removes all items from bagItems array
	 */
	empty() {
		bagItems = [];
	},

	/**
	 * filter array
	 * returns a bag item (object)
	 * @param  {number} variantId
	 * @return {Object}
	 */
	filterArray(variantId) {
		variantId = _.toNumber(variantId);

		return bagItems.filter(obj => obj.id === variantId)[0];
	}
};