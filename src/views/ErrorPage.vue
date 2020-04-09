<template>
	<div>
		<v-content>
			<v-container fluid>
				<h1>אופס!</h1>
				<h2>הייתה בעיה בהתחברות לשרת...</h2>
				<br />
				<v-btn @click="tryAgain" color="primary">נסה שוב</v-btn>
			</v-container></v-content
		>
	</div>
</template>
<script>
export default {
	methods: {
		tryAgain() {
			this.$router.push('/');
		}
	}
};
</script>
