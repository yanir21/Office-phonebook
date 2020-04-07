import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { apolloProvider } from './vue-apollo';

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,

	mounted() {
		this.$vuetify.rtl = true;
	},

	apolloProvider,
	render: h => h(App)
}).$mount('#app');
