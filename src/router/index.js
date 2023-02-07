import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),

      component: () => import("@/views/CalendarPage.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("@/views/CreateDate.vue"),
      props: (route) => ({
        ...route.params,
        id: parseInt(route.params.id),
      }),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/CheckoutPage.vue"),
      props: (route) => ({
        ...route.params,
        id: parseInt(route.params.id),
      }),
    },
  ],
});

export default router;
