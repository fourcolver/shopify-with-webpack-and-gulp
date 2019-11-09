<template>
	<section id="addressNew" class="ac-section ac-address-new">
		<form
			method="post"
			action="/account/addresses"
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
						<label for="addressNewFirstName">
							First Name
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewFirstName"
							class="input"
							name="address[first_name]"
							type="text"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewLastName">
							Last Name
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewLastName"
							class="input"
							name="address[last_name]"
							type="text"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewCompany">
							Company
						</label>
						<input id="addressNewCompany" class="input" name="address[company]" type="text" />
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewPhone">
							Phone
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewPhone"
							class="input"
							name="address[phone]"
							type="tel"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewAddress1">
							Address 1
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewAddress1"
							class="input"
							name="address[address1]"
							type="text"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewAddress2">
							Address 2
						</label>
						<input
							id="addressNewAddress2"
							class="input"
							name="address[address2]"
							type="text"
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="select">
						<select
							id="addressNewCountry"
							class="input"
							name="address[country]"
							required
						>
						</select>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div id="addressNewProvinceContainer" class="select" style="display: none;">
						<select
							id="addressNewProvince"
							class="input"
							name="address[province]"
							required
						>
						</select>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewCity">
							City
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewCity"
							class="input"
							name="address[city]"
							type="text"
							required
						/>
					</div>
				</li>

				<li class="form-item form-item--half">
					<div class="input-placeholder">
						<label for="addressNewZip">
							Postal/Zip Code
							<span class="input__asterisk"> *</span>
						</label>
						<input
							id="addressNewZip"
							class="input"
							name="address[zip]"
							type="text"
							required
						/>
					</div>
				</li>

				<li class="form-item">
					<div class="checkbox">
						<input id="addressNewDefault" name="address[default]" type="checkbox" value="1" />
						<label for="addressNewDefault">
							Set as default address
						</label>
					</div>
				</li>

				<li class="form-item ac-form-action">
					<button class="btn btn--full" type="submit">
						<span class="btn__bg"></span>
						<span class="btn__border"></span>
						<span class="btn__label">
							Add Address
						</span>
					</button>
				</li>

			</ul>
		</form>
	</section>
</template>

<script>
// mixins
import common from './mixins/common';
import form from './mixins/form';

// components
import SectionHeader from './SectionHeader.vue';

// address new view component
export default {
	name: 'AddressNewView',
	mixins: [
		common,
		form,
	],
	components: {
		SectionHeader,
	},
	data() {
		return {
			cookie: SDG.Dashboard.AddressCookie.added,
			countryOptionTags: accountCountryOptionTags,
			sectionHeaderOptions: {
				isSub: true
			},
			sectionHeaderTitle: 'New Address',
		};
	},
	mounted() {

		// fill country select with Shopify options
		// @see mixins/form
		this.fillCountrySelect('addressNewCountry');

		// placeholders
		// @see mixins/form
		this.initPlaceholders();

		// shopify province selector
		// eslint-disable-next-line
		new Shopify.CountryProvinceSelector('addressNewCountry', 'addressNewProvince', {
			hideElement: 'addressNewProvinceContainer'
		});
	},
	methods: {
		onBackClick() {
			this.setView('AddressBookView');
		},
	},
};
</script>