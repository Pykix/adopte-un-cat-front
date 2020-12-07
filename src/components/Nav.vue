<template>
  <div class="container-fluid">
    <nav class="navbar navbar-dark navbar-expand-lg">
      <img class="img-fluid" :src="image" alt="brand-logo">
      <button class="navbar-toggler mt-md-5" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item mt-5 mx-3">
            <router-link to="/">Accueil</router-link>
          </li>
          <li class="nav-item mt-5 mx-3" v-if="!logged">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-else @click="logout" class="nav-item mx-3 mt-5">Logout</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

import axios from "axios";
import Cookies from "js-cookie";
import store from "@/store/store";

export default {
  name: "Nav",
  data() {
    return {
      isConnected: false,
      image: require("@/assets/adopteuncat.png")
    };
  },
  computed: {
    logged() {
      return store.state.isConnected;
    }
  },
  methods: {
    logout() {
      const csrfToken = Cookies.get("csrftoken");
      const djangoAuthToken = localStorage.getItem("Token");
      const config = {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
          Authorization: "Token " + djangoAuthToken
        }
      };
      axios
        .post("http://localhost:8000/api/rest-auth/logout/", config)
        .then(response => {
          if (response.status === 200 && localStorage.getItem("user_id")) {
            alert("Vous vous etes bien deconnecté");
            localStorage.clear();
            store.commit("isconnected");
            console.log(store.state.isConnected);
            this.$router.push("/login");
          }
        })
        .catch(err => console.log(err));

    }
  }
};
</script>

<style lang="scss" scoped>
.nav-item, a {
  color: aliceblue;

  :hover {
    color: red;
  }
}

.navbar-brand > img {
  max-width: 100px;
}
</style>