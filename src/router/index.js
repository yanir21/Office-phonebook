import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ErrorPage from '../views/ErrorPage.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/serverErrorPage',
		name: 'error',
		component: ErrorPage
	}
];

const router = new VueRouter({
	routes
});

export default router;
