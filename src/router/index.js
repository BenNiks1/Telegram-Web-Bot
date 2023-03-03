import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
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
      props: (route) => ({ ...route.params, id: route.params.id }),
    },

    // Выбор услуги
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/ServicesPage.vue'),
      props: (route) => ({ ...route.params, id: route.params.id }),
    },

    //  Календарь
    {
      path: '/calendar',
      name: 'calendar',
      props: (route) => ({ ...route.params, id: route.params.id }),

      component: () => import('@/views/CalendarPage.vue'),
    },

    //  Выбор специалиста
    {
      path: '/slots',
      name: 'slots',
      props: (route) => ({ ...route.params, id: route.params.id }),

      component: () => import('@/views/SlotsPage.vue'),
    },

    // Создание заказа
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/OrderPage.vue'),
      props: (route) => ({
        ...route.params,
        id: route.params.id,
      }),
    },

    //  Финальный экран с успешной записью
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/SuccessPage.vue'),
      props: (route) => ({
        ...route.params,
        id: route.params.id,
      }),
    },
  ],
});

export default router;
