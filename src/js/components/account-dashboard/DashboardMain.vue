<template>
	<section id="acDashboard" class="ac-dashboard container container--account">
		<div class="ac-dashboard__wrap cf">
			<div id="acHeader" class="ac-header">
				<header class="ac-header__section-header section-header">
					<h1 class="section-header__hdg">
						My Account
					</h1>
				</header>
				<DashboardNav />
			</div>
			<div id="acContent" class="ac-content">
				<transition name="component-fade" mode="out-in" appear>
					<keep-alive>
						<component :is="$root.currentView"></component>
					</keep-alive>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
// components
import AddressBookView from './AddressBookView.vue';
import AddressEditView from './AddressEditView.vue';
import AddressNewView from './AddressNewView.vue';
import DashboardNav from './DashboardNav.vue';
import InfoView from './InfoView.vue';
import OrderHistoryView from './OrderHistoryView.vue';

// dashboard main component
export default {
	name: 'DashboardMain',
	components: {
		AddressBookView,
		AddressEditView,
		AddressNewView,
		DashboardNav,
		InfoView,
		OrderHistoryView,
	},
};
</script>