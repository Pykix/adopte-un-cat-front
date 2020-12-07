<template>
  <div class="text-center profile">
    <img class="w-100" :src="profileData.photo" alt="">
    <div class="container">
      <h1>Mon profil</h1>
      <h2>{{ profileData.user }}</h2>
      <p>{{ profileData.biography }}</p>
      <hr>
      <p>{{ profileData.hobby }}</p>
    </div>
  </div>
</template>

<script>
//import ProfileForm from "@/components/ProfileForm/ProfileForm";
import axios from "axios";
import Cookies from "js-cookie";


export default {
  name: "Profile",
  props: ["profile"],
  data() {
    return {
      profileData: ""
    };
  },

  components: {
    //'profile-form': ProfileForm
  },
  watch: {},
  mounted() {
    const csrfToken = Cookies.get("csrftoken");
    const config = {
      headers: {
        "X-CSRFToken": csrfToken,
        Authorization: "Token " + localStorage.getItem("Token")
      }
    };
    const profileId = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}/`, config)
      .then(r => this.profileData = r.data);
  }
};
</script>

<style scoped>
.profile {
  color: aliceblue;
}
</style>