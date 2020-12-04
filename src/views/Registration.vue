<template>
  <div class="container">
    <div v-if="!goCreateProfile">
      <h2 class="text-center">Miaouscription</h2>
      <form class="mx-auto">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            placeholder="Tapenade"
            class="form-control"
            id="username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="email">Catmail</label>
          <input
            type="email"
            placeholder="tapenade@croquette.chat"
            class="form-control"
            id="email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password1">Meow de passe</label>
          <input
            type="password"
            class="form-control"
            id="password1"
            v-model="password1"
          />
        </div>
        <div class="form-group">
          <label for="password2">Confirmez le meow de passe</label>
          <input
            type="password"
            class="form-control"
            id="password2"
            v-model="password2"
          />
        </div>
        <button @click.prevent="register" type="submit" class="btn btn-primary">Miaouscription</button>
      </form>
    </div>
    <profile-form v-else></profile-form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import ProfileForm from "@/components/ProfileForm/ProfileForm";

export default {
  name: "Registration",
  components: {
    "profile-form": ProfileForm
  },
  data() {
    return {
      username: null,
      email: null,
      password1: null,
      password2: null,
      goCreateProfile: true
    };
  },
  methods: {
    register() {
      const csrfToken = Cookies.get("csrftoken");
      // const authToken = "Token " + localStorage.getItem("Token");
      const config = {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json"
        }
      };
      const data = {
        "username": this.username,
        "email": this.email,
        "password1": this.password1,
        "password2": this.password2
      };

      axios
        .post("http://localhost:8000/api/rest-auth/registration/", data, config)
        .then(r => console.log(r))
        .catch(err => console.log(err));
      this.goCreateProfile = true;
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