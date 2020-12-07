import Vue from "vue";
import "es6-promise/auto";
import store from "@/store/store";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

export const bus = new Vue();


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
