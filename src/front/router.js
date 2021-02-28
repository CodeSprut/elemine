import { createWebHashHistory, createRouter } from "vue-router";
import main from "./components/main";

const routes = [
  {
    path: "/",
    name: "main",
    component: main,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
