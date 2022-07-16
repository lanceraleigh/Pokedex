import { createRouter, createWebHistory } from "vue-router";
import InitialSearch from "../views/InitialSearch.vue";
import StatComparison from "../views/StatComparison.vue";

const routes = [
  {
    path: "/",
    name: "InitialSearch",
    component: InitialSearch
  },
  {
    path: "/statcomparison",
    name: "StatComparison",
    component: StatComparison
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// router.beforeEach((to, from, next) => {

// });

export default router;
