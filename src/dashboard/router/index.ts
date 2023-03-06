import type { RouteRecordRaw } from "vue-router";
import LayoutPage from "@/dashboard/layout/LayoutDasboard.vue";

export const dashboardRoutes: RouteRecordRaw = {
  path: "/",
  redirect: { name: "reservations" },
  component: LayoutPage,
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("@/dashboard/pages/DashboardPage.vue")
    },
    {
      path: "reservations",
      name: "reservations",
      component: () => import("@/dashboard/pages/ReservationsPage.vue")
    }
  ]
};
