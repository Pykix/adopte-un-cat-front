import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Registration from "@/views/Registration";
import Profile from "@/views/Profile";
import Like from "@/views/Like";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavigation: true }
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: { hideNavigation: true }
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profile,
    meta: { inProfileSpace: true }
  },
  {
    path: "/likes",
    name: "Like",
    component: Like
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
