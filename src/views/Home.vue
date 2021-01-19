<template>
  <div class="container">
    <div class="row justify-content-around">
      <profile-card
        @fullProfile="fullProfile"
        @like="like"
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
    },
    like(data) {
      if (localStorage.getItem("Token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("Token")
        }
      };
      data = {
        'to_user': data.profile.id
      }
      // const user_id = localStorage.getItem("user_id");
      axios
        .post("http://127.0.0.1:8000/api/like/", data, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => console.log(err));
    } else {
      console.log('coucou')
      // this.$router.push("/login");
    }
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
        .get("http://127.0.0.1:8000/api/discover/", config)
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

<style scoped></style>
