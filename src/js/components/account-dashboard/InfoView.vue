<template>
	<section id="info" class="ac-section ac-info">
		<SectionHeader
			:backClick="onBackClick"
			:options="sectionHeaderOptions"
			:title="sectionHeaderTitle"
		/>
		<div class="ac-content-box">
			<h2 class="ac-hdg">
				My Info
			</h2>
			<p>
				{{ customerName }}<br />
				{{ customerEmail }}
			</p>
		</div>
		<div class="ac-content-box">
			<h2 class="ac-hdg">
				Password
			</h2>
			<p>
				••••••••••
			</p>
			<form
				class="ac-content-box__actions"
				method="post"
				action="/account/recover"
				accept-charset="UTF-8"
				@submit.prevent="onPasswordResetSubmit($event)"
			>
				<input type="hidden" name="form_type" value="recover_customer_password" />
				<input type="hidden" name="utf8" value="✓" />
				<input type="hidden" name="email" :value="customerEmail" />
				<button
					class="ac-content-box__action btn btn--small btn--tertiary js-submit-btn"
					type="submit"
				>
					<span class="btn__bg"></span>
					<span class="btn__label">
						Reset
					</span>
				</button>
			</form>
		</div>
	</section>
</template>

<script>
// config
import c from './config/config';

// mixins
import common from './mixins/common';
import mainView from './mixins/main-view';

// components
import SectionHeader from './SectionHeader.vue';

// info view component
export default {
	name: 'InfoView',
	mixins: [
		common,
		mainView,
	],
	components: {
		SectionHeader,
	},
	data() {
		return {
			customerEmail,
			customerName,
			sectionHeaderOptions: {
				isPhoneOnly: true
			},
			sectionHeaderTitle: 'My Info',
			submitBtn: '',
		};
	},
	methods: {

		/**
		 * on password reset submit
		 * @param {Object} e event
		 */
		onPasswordResetSubmit(e) {
			const $form = e.target;

			// set submit button
			this.submitBtn = $form.querySelector(c.s.submit_btn);

			// disable button
			this.disableSubmitButton();

			// init ajax
			this.initAjaxSubmit($form);
		},

		/**
		 * init ajax submit
		 */
		initAjaxSubmit($form) {
			const data = _.serialize($form);
			const url = $form.getAttribute('action');

			// init ajax call
			_.ajax({
				data,
				error: this.submitError,
				success: this.submitSuccess,
				type: 'POST',
				url,
			});
		},

		/**
		 * disable submit button
		 */
		disableSubmitButton() {
			this.submitBtn.disabled = true;
			_.addClass(this.submitBtn, c.cls.loading);
		},

		/**
		 * enable submit button
		 */
		enableSubmitButton() {
			this.submitBtn.disabled = false;
			_.removeClass(this.submitBtn, c.cls.loading);
		},

		/**
		 * submit error
		 */
		submitError(resp) {
			console.log(resp);

			// init message
			SDG.Dashboard.Message.update({
				show: true,
				text: 'We\'re sorry, but there\'s a problem with this feature right now. Please try again later or try directly on the <a href="/account/login#recover">password reset page</a>.',
				type: 'error'
			});

			// enable button
			this.enableSubmitButton();
		},

		/**
		 * submit success
		 */
		submitSuccess() {

			// init message
			SDG.Dashboard.Message.update({
				show: true,
				text: 'We\'ve sent you an email with a link to update your password.',
				type: 'success'
			});

			// enable button
			this.enableSubmitButton();
		},
	},
};
</script>