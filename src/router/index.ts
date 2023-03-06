import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/auth/pages/LoginPage.vue";
import LayoutPage from "@/dashboard/layout/LayoutDasboard.vue";
import { dashboardRoutes } from "@/dashboard/router";
import { useReservationsStore } from "@/stores/reservations";
import { LocalStorageEncrypt } from "@/utility";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    dashboardRoutes,
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "layout" }
    }
  ]
});

router.beforeEach(async (to) => {
  const store = useReservationsStore();
  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    const user = LocalStorageEncrypt.decrypt("user");
    store.onSetUserLogin(user);
  }
  if (!store.isAuthenticated && to.name === "dashboard") {
    return { name: "login" };
  } else if (store.isAuthenticated && to.name === "login") {
    return { name: "dashboard" };
  }
});

export default router;
