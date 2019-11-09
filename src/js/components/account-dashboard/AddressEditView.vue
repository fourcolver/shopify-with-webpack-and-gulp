<template>
	<section id="addressEdit" class="ac-section ac-address-edit">
		<form
			method="post"
			:action="formAction"
			accept-charset="UTF-8"
			@submit.prevent="onSubmit($event)"
		>
			<input type="hidden" value="customer_address" name="form_type" />
			<input type="hidden" name="utf8" value="✓" />

			<SectionHeader
				:backClick="onBackClick"
				:options="sectionHeaderOptions"
				:title="sectionHeaderTitle"
			/>

			<ul class="form-list">

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditFirstName">
							First Name
						</label>
						<input
							id="addressEditFirstName"
							class="input"
							name="address[first_name]"
							type="text"
							:value="address.first_name"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditLastName">
							Last Name
						</label>
						<input
							id="addressEditLastName"
							class="input"
							name="address[last_name]"
							type="text"
							:value="address.last_name"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditCompany">
							Company
						</label>
						<input
							id="addressEditCompany"
							class="input"
							name="address[company]"
							type="text"
							:value="address.company"
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditPhone">
							Phone
						</label>
						<input
							id="addressEditPhone"
							class="input"
							name="address[phone]"
							type="tel"
							:value="address.phone"
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditAddress1">
							Address 1
						</label>
						<input
							id="addressEditAddress1"
							class="input"
							name="address[address1]"
							type="text"
							:value="address.address1"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditAddress2">
							Address 2
						</label>
						<input
							id="addressEditAddress2"
							class="input"
							name="address[address2]"
							type="text"
							:value="address.address2"
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="select">
						<select
							id="addressEditCountry"
							class="input"
							name="address[country]"
							:data-default="address.country_name"
							required
						>
						</select>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div id="addressEditProvinceContainer" class="select" style="display: none;">
						<select
							id="addressEditProvince"
							class="input"
							name="address[province]"
							:data-default="address.province"
							required
						>
						</select>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditCity">
							City
						</label>
						<input
							id="addressEditCity"
							class="input"
							name="address[city]"
							type="text"
							:value="address.city"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressEditZip">
							Postal/Zip Code
						</label>
						<input
							id="addressEditZip"
							class="input"
							name="address[zip]"
							type="text"
							:value="address.zip"
							required
						/>
					</div>
				</li>

				<li v-if="!address.default" class="form-item">
					<div class="checkbox">
						<input
							id="addressEditDefault"
							name="address[default]"
							type="checkbox"
							value="1"
						/>
						<label for="addressEditDefault">
							Set as default address
						</label>
					</div>
				</li>

				<li class="form-item ac-form-action">
					<button class="btn btn--full" type="submit">
						<span class="btn__bg"></span>
						<span class="btn__border"></span>
						<span class="btn__label">
							Update Address
						</span>
					</button>
				</li>

			</ul>

			<input type="hidden" name="_method" value="put">
		</form>
	</section>
</template>

<script>
// mixins
import common from './mixins/common';
import form from './mixins/form';

// components
import SectionHeader from './SectionHeader.vue';

// address edit view component
export default {
	name: 'AddressEditView',
	mixins: [
		common,
		form,
	],
	components: {
		SectionHeader,
	},
	data() {
		return {
			address: {},
			componentDataToSet: {
				address: 'currentAddressEdit',
			},
			countryOptionTags: accountCountryOptionTags,
			cookie: SDG.Dashboard.AddressCookie.edited,
			sectionHeaderOptions: {
				isSub: true
			},
		};
	},
	updated() {

		// fill country select with Shopify options
		// @see mixins/form
		this.fillCountrySelect('addressEditCountry');

		// placeholders
		// @see mixins/form
		this.initPlaceholders();

		// shopify province selector
		// eslint-disable-next-line
		new Shopify.CountryProvinceSelector('addressEditCountry', 'addressEditProvince', {
			hideElement: 'addressEditProvinceContainer'
		});
	},
	computed: {
		formAction() {
			return `/account/addresses/${this.address.id}`;
		},
		sectionHeaderTitle() {
			return `Edit Address ${this.address.displayIndex}`;
		},
	},
	methods: {
		onBackClick() {
			this.setView('AddressBookView');
		},
	},
};
</script>