import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/renewablesort/espresso/:slug',
      name: 'Espresso',
      component: () => import('@/pages/renewablesort/espresso.vue'),
      props: true,
    },
    // Add other routes here
  ],
});