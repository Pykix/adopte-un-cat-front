<template>
  <div class="row justify-content-around">
    <LikeCard
      v-for="(profile, index) in profiles"
      :key="index"
      :profile="profile">
    </LikeCard>
  </div>
</template>

<script>
import LikeCard from "@/components/LikeCard/LikeCard";

import axios from "axios";

export default {
  name: "Like",
  data() {
    return {
      profile: null,
      profiles: null
    };
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
        .get("http://127.0.0.1:8000/api/like/", config)
        .then(response => {
          this.profiles = response.data;
          console.log(this.profiles)
        })
        .catch(err => console.log(err));
    }
  },
  components: { LikeCard }
};
</script>

<style scoped>

</style>