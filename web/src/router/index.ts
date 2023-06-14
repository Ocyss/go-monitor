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
    children: [
      {
        path: "/view",
        // component: lazy(() => import())
      },
    ],
  },
];
