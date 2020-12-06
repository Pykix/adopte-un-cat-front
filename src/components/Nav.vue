<template>
  <div class="justify-content-center">
    <img class="img-fluid mx-auto d-block" :src="image" alt="brand-logo">
    <nav class="nav justify-content-center">
      <div class="nav-item mx-3">
        <router-link to="/">Accueil</router-link>
      </div>
      <div class="nav-item mx-3">
        <router-link to="/login">Login</router-link>
      </div>
      <div @click="logout" class="nav-item mx-3">Logout</div>
    </nav>
  </div>
</template>

<script>

import axios from "axios";
import Cookies from "js-cookie";


export default {
  name: "Nav",
  data() {
    return {
      isConnected: false,
      image: require("@/assets/adopteuncat.png")
    };
  },
  methods: {
    logout() {
      console.log("bonjour")
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
            this.$router.push("/login");
          }
        })
        .catch(err => console.log(err));

    }
  }
};
</script>

<style scoped>
img {

}
</style>