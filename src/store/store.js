import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: localStorage.getItem('user_id')
  },
  mutations: {
    isconnected(state) {
      state.isConnected = localStorage.getItem('user_id');
    },
  }
});