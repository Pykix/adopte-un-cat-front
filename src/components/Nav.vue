<template>
<div>
<div class="container-fluid px-mt-lg-0">  
    <nav
      v-if="!$route.meta.hideNavigation"
      class="navbar navbar-light navbar-expand-lg p-lg-4"
    >
      <button
        class="navbar-toggler mt-md-5 bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item mt-4 mt-lg-0 mx-3">
            <router-link to="/">Accueil</router-link>
          </li>

          <li class="nav-item mt-4 mt-lg-0 mx-3">
            <router-link to="/profil">Mon Profil</router-link>
          </li>
          <li class="nav-item mt-4 mt-lg-0 mx-3">
            <router-link to="/message">Mes Messages</router-link>
          </li>
          <li class="nav-item mt-4 mt-lg-0 mx-3">
            <router-link to="/likes">Mes Likes</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item mt-4 mt-lg-0" v-if="!logged">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-else id="logout" @click="logout" class="nav-item mx-3 mt-4 mt-lg-0">Logout</li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="text-center">
      <img class="img-fluid" :src="image" alt="brand-logo" />
  </div>
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
    // isLoginOrRegistration() {
    //
    // },
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
            alert("Vous etes bien deconnecté");
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
.nav-item,
a {
  color: aliceblue;
  transition: 0.3s;
  :hover {
    color: #DE16AC;
    text-decoration: none;
  }
}
.navbar-brand > img {
  max-width: 100px;
}
#logout {
  cursor: pointer;
  :hover {
    color: #DE16AC;
  }
}

@media (min-width: 992px){
  .container-fluid {
  background: #273747;
}
}
</style>
