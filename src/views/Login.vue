<template>
  <div class="container">
    <h2 class="text-center">Connexion</h2>
    <form class="mx-auto">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <button @click.prevent="login" type="submit" class="btn btn-primary">
        Miaounexion
      </button>
    </form>

    <div class="text-center mt-3">
      Pas encore inscrit ? Viens parminou
      <router-link to="/registration">ici</router-link>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

import store from "@/store/store";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      connected: false,
      errorMessage: null
    };
  },
  methods: {
    login() {
      if (!localStorage.getItem("user_id")) {
        const token = Cookies.get("csrftoken");
        const body = { username: this.username, password: this.password };
        const config = {
          headers: {
            "X-CSRFToken": token,
            "Content-Type": "application/json"
          }
        };

        axios
          .post("http://127.0.0.1:8000/api/rest-auth/login/", body, config)
          .then(response => {
            if (response.status === 200) {
              localStorage.setItem("Token", response.data.key);
              localStorage.setItem("user_id", response.data.user);
              localStorage.setItem("username", this.username);
              store.commit("isconnected");
              this.$router.push("/");
            }
          })
          .catch(() => {
            this.username = this.password = "";
            this.errorMessage = "Les identifiants ne sont pas bon ";
          });
      }
    }
  }
};
</script>

<style scoped>
.container {
  color: aliceblue;
}

form {
  width: 350px;
}
</style>
