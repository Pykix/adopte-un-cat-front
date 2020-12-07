<template>
  <div class="container">
    <div class="row justify-content-around">
      <profile-card
        @fullProfile="fullProfile($event)"
        v-for="(profile, index) in profiles"
        :key="index"
        :profile="profile"
      ></profile-card>
    </div>
  </div>
</template>

<script>

import ProfileCard from "@/components/ProfileCard/ProfileCard";

import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      profiles: null
    };
  },
  methods: {},
  components: {
    "profile-card": ProfileCard
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