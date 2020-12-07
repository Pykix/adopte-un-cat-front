<template>
  <div class="container">
    <div class="row justify-content-around">
      <profile-card
        @fullProfile="fullProfile"
        v-for="(profile, index) in profiles"
        :key="index"
        :profile="profile"
      ></profile-card>
    </div>
    <profile-modal

      v-if="showModal"
      @close="showModal = false"
      :profile="profile"
    />
  </div>
</template>

<script>

import ProfileCard from "@/components/ProfileCard/ProfileCard";

import axios from "axios";
import ProfileDetail from "@/components/ProfileDetail/ProfileDetail";

export default {
  name: "Home",
  data() {
    return {
      profiles: null,
      profile: null,
      showModal: false
    };
  },
  methods: {
    fullProfile(data) {
      this.profile = data.profile;
      this.showModal = true;
      console.log(this.profile, this.showModal);
    }
  },
  components: {
    "profile-card": ProfileCard,
    "profile-modal": ProfileDetail
  },
  mounted() {
    if (localStorage.getItem("Token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("Token")
        }
      };

      axios
        .get("http://localhost:8000/api/profiles/", config)
        .then(response => {
          this.profiles = response.data;
        })
        .catch(err => console.log(err));
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>

</style>