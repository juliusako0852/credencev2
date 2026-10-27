import { defineRouter } from "#q-app";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE)
  });

  // enable HMR for it
  if (import.meta.hot) {
    handleHotUpdate(Router);
  }

  Router.onError(error => {
    console.error("Router navigation error:", error);
  });

  Router.beforeEach(to => {
    const token = localStorage.getItem("token");

    // Block all /app pages if the user is not logged in
    if (to.path.startsWith("/app") && !token) {
      return { path: "/" };
    }

    // Redirect logged-in users away from the login page
    if (to.path === "/" && token) {
      return { path: "/app" };
    }

    return true;
  });

  return Router;
});
