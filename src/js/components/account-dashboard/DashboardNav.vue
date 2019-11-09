<template>
	<nav id="acNav" class="ac-nav">
		<ul class="ac-nav__list list-reset">
			<li
				class="ac-nav__item js-nav-item"
				:class="{ 'is-active': $root.isView('InfoView') }"
			>
				<button
					class="ac-nav__btn js-nav-btn"
					type="button"
					@click="$root.setMainView('InfoView')"
				>
					My Info
				</button>
			</li>
			<li
				class="ac-nav__item js-nav-item"
				:class="{ 'is-active': $root.isView('OrderHistoryView,OrderView') }"
			>
				<button
					class="ac-nav__btn js-nav-btn"
					type="button"
					@click="$root.setMainView('OrderHistoryView')"
				>
					Order History
				</button>
			</li>
			<li
				class="ac-nav__item js-nav-item"
				:class="{ 'is-active': $root.isView('AddressBookView,AddressEditView,AddressNewView') }"
			>
				<button
					class="ac-nav__btn js-nav-btn"
					type="button"
					@click="$root.setMainView('AddressBookView')"
				>
					Address Book
				</button>
			</li>
			<li class="ac-nav__item js-nav-item">
				<a href="/account/logout">
					Log Out
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
// dashboard nav component
export default {
	name: 'DashboardNav',
};
</script>