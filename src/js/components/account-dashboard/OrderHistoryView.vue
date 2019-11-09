<template>
	<section id="orderHistory" class="ac-section ac-order-history">
		<SectionHeader
			:backClick="onBackClick"
			:options="sectionHeaderOptions"
			:title="sectionHeaderTitle"
		/>
		<template v-if="hasOrders">
			<table class="ac-order-history__table ac-table">
				<thead class="desktop-and-tablet">
					<tr>
						<th>Date</th>
						<th>Order</th>
						<th>Fulfillment Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="order in paginatedItems"
						:key="order.order_number"
					>
						<td data-label="Date">
							{{ order.created_at }}
						</td>
						<td data-label="Order">
							<a class="btn-link" :href="order.order_status_url" target="_blank">
								{{ order.name }}
							</a>
						</td>
						<td data-label="Fulfillment Status">
							{{ order.fulfillment_status_label }}
						</td>
					</tr>
				</tbody>
			</table>
			<Pagination
				:options="paginationOptions"
				:items="items"
			/>
		</template>
		<p v-else>
			You haven't placed any orders yet.
		</p>
	</section>
</template>

<script>
// mixins
import common from './mixins/common';
import mainView from './mixins/main-view';
import pagination from './mixins/pagination';

// components
import PaginationList from './PaginationList.vue';
import SectionHeader from './SectionHeader.vue';

// order history view component
export default {
	name: 'OrderHistoryView',
	mixins: [
		common,
		mainView,
		pagination,
	],
	components: {
		PaginationList,
		SectionHeader,
	},
	data() {
		return {
			items: accountOrders,
			paginationOptions: {
				currentPage: 0,
				itemsPerPage: 10
			},
			sectionHeaderOptions: {
				isPhoneOnly: true
			},
			sectionHeaderTitle: 'Order History',
		};
	},
	computed: {
		hasOrders() {
			return this.items.length > 0;
		},
	},
};
</script>