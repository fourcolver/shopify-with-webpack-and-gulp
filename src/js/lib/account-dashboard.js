/**
 * account dashboard
 *
 * import dependencies
 * namespace
 * account dashboard
 */

/**
 * import dependencies
 */
import Vue from 'vue';
import c from '../components/account-dashboard/config/config';
import DashboardMain from '../components/account-dashboard/DashboardMain.vue';

/**
 * namespace
 */
SDG.Dashboard = SDG.Dashboard || {};

// view model instance
SDG.Dashboard.Vm = {};

// address cookie
SDG.Dashboard.AddressCookie = {
	added: {
		exdays: 1000,
		name: 'address_added',
		value: 'set'
	},
	deleted: {
		exdays: 1000,
		name: 'address_deleted',
		value: 'set'
	},
	edited: {
		exdays: 1000,
		name: 'address_edited',
		value: 'set'
	}
};

/**
 * account dashboard
 * @return {accountDashboard~init}
 */
function accountDashboard() {

	// cookie shortcut
	const addressCookie = SDG.Dashboard.AddressCookie;

	// check for cookies
	const isCookieSet = {
		addressAdded: SDG.getCookie(addressCookie.added.name) === addressCookie.added.value,
		addressEdited: SDG.getCookie(addressCookie.edited.name) === addressCookie.edited.value,
		addressDeleted: SDG.getCookie(addressCookie.deleted.name) === addressCookie.deleted.value
	};

	// default current view
	let currentView = 'InfoView';

	/**
	 * init
	 */
	function init() {
		detectUrl();
		setCurrentView();
		initVue();
		displayMessage();
	}

	/**
	 * detect url
	 */
	function detectUrl() {
		const isAddressesPage = window.location.href.indexOf('/addresses') !== -1;

		// if url contains '/addresses' (on address book page)
		if (isAddressesPage) {

			// remove addresses from url
			window.history.pushState('', document.title, '/account');
		}
	}

	/**
	 * set current view
	 */
	function setCurrentView() {
		const isAddressCookieSet = isCookieSet.addressAdded
		|| isCookieSet.addressEdited
		|| isCookieSet.addressDeleted;

		if (isAddressCookieSet) {
			currentView = 'AddressBook';
		}
	}

	/**
	 * init Vue
	 */
	function initVue() {

		// eslint-disable-next-line
		SDG.Dashboard.Vm = new Vue({
			el: '#acDashboard',
			components: { DashboardMain },
			template: '<DashboardMain />',
			data: {
				currentAddressEdit: {},
				currentView,
			},
			methods: {
				addContentActiveClass() {
					const el = this.$el;

					setTimeout(() => {
						_.addClass(el, c.cls.content_active);
					}, 50);
				},
				isView(views) {
					const vm = this;

					views = views.indexOf(',') !== -1 ? views.split(',') : [views];

					return views.some(view => view === vm.currentView);
				},
				removeLoadingClass() {
					_.removeClass(this.$el, c.cls.loading);
				},
				setMainView(view) {
					this.currentView = view;

					// add content active class if phone view
					_.mq({
						callback: this.addContentActiveClass,
						view: 'phone'
					});
				},
			},
		});
	}

	/**
	 * display message
	 */
	function displayMessage() {
		let msg;

		// check which cookie is set, set msg appropriately, delete cookie

		// if address added
		// else if address edited
		// else if address deleted
		// else no cookies, exit function
		if (isCookieSet.addressAdded) {
			msg = 'Address has been successfully added.';
			SDG.deleteCookie(addressCookie.added.name);
		} else if (isCookieSet.addressEdited) {
			msg = 'Address has been successfully updated.';
			SDG.deleteCookie(addressCookie.edited.name);
		} else if (isCookieSet.addressDeleted) {
			msg = 'Address has been successfully deleted.';
			SDG.deleteCookie(addressCookie.deleted.name);
		} else {
			return;
		}

		// show/update message
		SDG.Dashboard.Message.update({
			text: msg,
			type: 'success',
			show: true,
		});
	}

	return init();
}

export default accountDashboard;