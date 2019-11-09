<template>
	<header
		class="ac-section-header"
		:class="{ 'ac-section-header--sub': options.isSub, 'phone-only': options.isPhoneOnly }"
	>
		<h2 class="ac-section-header__hdg">
			{{ title }}
		</h2>
		<button
			class="ac-section-header__back btn-link icon icon--inline icon--carrots-left"
			type="button"
			@click="backClick"
		>
			Back
		</button>
		<p
			v-if="description"
			class="ac-section-header__desc"
		>
			{{ description }}
		</p>
	</header>
</template>

<script>
// section header component
export default {
	name: 'SectionHeader',
	props: [
		'backClick',
		'description',
		'options',
		'title',
	],
};
</script>