import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	// Главная
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/HomePage.vue'),
	},

	// Выбор города и сервиса
	{
		path: '/dc',
		name: 'dc',
		component: () => import('@/views/DCPage.vue'),
	},

	// Выбор услуги
	{
		path: '/services',
		name: 'services',
		component: () => import('@/views/ServicesPage.vue'),
	},

	//  Календарь
	{
		path: '/calendar',
		name: 'calendar',

		component: () => import('@/views/CalendarPage.vue'),
	},

	//  Выбор специалиста
	{
		path: '/slots',
		name: 'slots',

		component: () => import('@/views/SlotsPage.vue'),
	},

	// Создание заказа
	{
		path: '/order',
		name: 'order',
		component: () => import('@/views/OrderPage.vue'),
	},

	//  Финальный экран с успешной записью
	{
		path: '/success',
		name: 'success',
		component: () => import('@/views/SuccessPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(undefined),
	routes,
});

export default router;
