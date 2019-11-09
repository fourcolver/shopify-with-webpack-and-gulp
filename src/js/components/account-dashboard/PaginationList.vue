<template>
	<ol v-if="show" class="pagination list-reset cf">
		<li
			class="pagination__item"
			v-for="n in totalPages"
			v-if="shouldDisplayLink(n)"
			:key="n"
		>
			<button
				class="pagination__btn btn"
				:class="setLinkClass(n)"
				type="button"
				@click="setPage(n)"
			>
				<span class="pagination__btn-to-first">...</span>
				{{ n }}
				<span class="pagination__btn-to-last">...</span>
			</button>
		</li>
	</ol>
</template>

<script>
// pagination list component
export default {
	name: 'PaginationList',
	props: {
		items: {
			type: Array,
			required: true,
		},
		options: {
			type: Object,
			required: true,
		}
	},
	computed: {
		show() {
			return this.items.length > this.options.itemsPerPage;
		},
		totalPages() {
			return Math.ceil(this.items.length / this.options.itemsPerPage);
		}
	},
	methods: {

		/**
		* set page
		* @param {number} n page number
		*/
		setPage(n) {
			this.options.currentPage = n - 1;
		},

		/**
		* set link class
		* @param {number} n page number
		*/
		setLinkClass(n) {
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
		shouldDisplayLink(n) {
			const isLessThanThreshold = Math.abs(n - this.options.currentPage - 1) < 3;
			const isFirst = n === 1;
			const isLast = n === this.totalPages;

			return isLessThanThreshold || isFirst || isLast;
		}
	},
};
</script>