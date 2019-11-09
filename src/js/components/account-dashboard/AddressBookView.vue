<template>
	<section id="addressBook" class="ac-section ac-addresses">

		<SectionHeader
			:backClick="onBackClick"
			:options="sectionHeaderOptions"
			:title="sectionHeaderTitle"
		/>

		<AddressItem v-for="address in paginatedItems"
					class="ac-address"
					:address="address"
					:key="address.id"
		/>

		<p v-if="!hasAddresses">
			You don't have any saved addresses yet.
		</p>

		<div class="ac-addresses__add">
			<button
				class="btn btn--secondary btn--small"
				type="button"
				@click="setView('AddressNewView')"
			>
				<span class="btn__bg"></span>
				<span class="btn__border"></span>
				<span class="btn__label">
					Add a New Address
				</span>
			</button>
		</div>

		<PaginationList
			:options="paginationOptions"
			:items="items"
		/>

	</section>
</template>

<script>
// mixins
import common from './mixins/common';
import mainView from './mixins/main-view';
import pagination from './mixins/pagination';

// components
import AddressItem from './AddressItem.vue';
import PaginationList from './PaginationList.vue';
import SectionHeader from './SectionHeader.vue';

// address book view component
export default {
	name: 'AddressBookView',
	mixins: [
		common,
		mainView,
		pagination,
	],
	components: {
		AddressItem,
		PaginationList,
		SectionHeader,
	},
	data() {
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
	},
	computed: {
		hasAddresses() {
			return this.items.length > 0;
		},
	},
};
</script>