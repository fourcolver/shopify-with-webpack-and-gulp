<template>
	<div class="ac-address">
		<div class="ac-address__view ac-content-box">
			<h2 class="ac-hdg">
				Address {{ address.displayIndex }}
				<span v-if="address.default"> (Default)</span>
			</h2>
			<div v-html="addressFormat"></div>
			<div class="ac-content-box__actions">
				<button
					class="ac-content-box__action btn btn--small"
					type="button"
					@click="setViewModelData('currentAddressEdit', address, 'AddressEditView')"
				>
					Edit
				</button>
				<button
					class="ac-content-box__action btn btn--small btn--secondary"
					type="button"
					data-confirm-message="Are you sure you wish to delete this address?"
					@click="destroyAddress($event, address.id)"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>

<script>
// mixins
import common from './mixins/common';
import form from './mixins/form';

// address item component
export default {
	name: 'AddressItem',
	mixins: [
		common,
		form,
	],
	props: [
		'address',
	],
	data() {
		return {
			cookie: SDG.Dashboard.AddressCookie.deleted,
		};
	},
	computed: {
		addressFormat() {
			const address = this.address;

			return `
				<p>
					${address.name}<br />
					${address.company ? `${address.company}<br />` : ''}
					${address.address1 ? `${address.address1}<br />` : ''}
					${address.address2 ? `${address.address2}<br />` : ''}
					${address.city}&nbsp;
					${address.province_code}&nbsp;
					${address.zip}<br />
					${address.country}
				</p>
			`;
		},
	},
	methods: {

		/**
		 * destroy address
		 * @param {Object} e  event
		 * @param {string} id address id
		 */
		destroyAddress(e, id) {
			let msg = e.target.getAttribute('data-confirm-message');
			const msgDefault = 'Are you sure you wish to delete this address?';

			msg = msg || msgDefault;

			// eslint-disable-next-line
			if (confirm(msg)) {

				// set cookie
				// @see mixins/form
				this.setCookie();

				// post link
				Shopify.postLink(`/account/addresses/${id}`, {
					parameters: {
						_method: 'delete',
					},
				});
			}
		},
	},
};
</script>