<template>
	<v-app>
		<navbar></navbar>
		<router-view></router-view>
	</v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
	name: 'App',
	components: {
		navbar: Navbar
	},

	data: () => ({
		//
	})
};
</script>
<style>
.application {
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.headline,
.title,
.subheading {
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif !important;
}
</style>
