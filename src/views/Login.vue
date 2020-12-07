<template>
  <div class="container">
    <h2 class="text-center">Connexion</h2>
    <form class="mx-auto">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <button @click.prevent="login" type="submit" class="btn btn-primary">Miaounexion</button>
    </form>
    <div class="text-center mt-3">
      Pas encore inscrit ? Viens minou
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
      connected: false
    };
  },
  methods: {

    login() {
      if (!localStorage.getItem("user_id")) {
        const token = Cookies.get("csrftoken");
        const body = { "username": this.username, "password": this.password };
        const config = {
          headers: {
            "X-CSRFToken": token,
            "Content-Type": "application/json"
          }
        };

        axios
          .post("http://localhost:8000/api/rest-auth/login/", body, config)
          .then(response => {
              if (response.status === 200) {
                localStorage.setItem("Token", response.data.key);
                localStorage.setItem("user_id", this.username);
                store.commit("isconnected");
                console.log(store.state.isConnected);
                this.$router.push("/");
              }
            }
          )
          .catch(err => console.log(err));
      }
    }
  }
}
;
</script>


<style scoped>
.container {
  color: aliceblue;
}

form {
  width: 350px;
}
</style>