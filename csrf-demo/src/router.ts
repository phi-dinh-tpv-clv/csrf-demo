import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import Homepage from "./components/Homepage.vue";
import Login from "./components/Login.vue";
import ChangePassword from "./components/ChangePassword.vue";

const routes = [
  { name: "homepage", path: "/", component: Homepage },
  { name: "login", path: "/login", component: Login },
  {
    name: "change-password",
    path: "/change-password",
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(), // createMemoryHistory(),
  routes,
});

export default router;
