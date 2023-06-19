import Home from "@/pages/home";
import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/view/:id",
    component: Home,
  },
  {
    path: "/admin",
    component: lazy(() => import("@/pages/admin")),
  },
  {
    path: "/admin/view/:id",
    component: lazy(() => import("@/pages/admin/view")),
  },
  {
    path: ["/err/404", "/*all"],
    component: lazy(() => import("@/pages/error/404")),
  },
];
