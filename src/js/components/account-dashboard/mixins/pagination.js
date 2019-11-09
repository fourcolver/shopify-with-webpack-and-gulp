/**
 * pagination
 * @type {Object}
 */
const pagination = {

	computed: {

		paginatedItems() {
			const index = this.paginationOptions.currentPage * this.paginationOptions.itemsPerPage;

			// return filtered items
			return this.items.slice(index, index + this.paginationOptions.itemsPerPage);
		}
	},
};

export default pagination;