<template>
<div>
  <h1>Ils t'ont liké</h1>
  <div class="row justify-content-center">
    <LikeCard
      v-for="(profile, index) in profiles"
      :key="index"
      :profile="profile"
      @isMatch="isMatch"
      @deleteMatch="deleteMatch"
      >
    </LikeCard>
  </div>
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
      profiles: null,
      
    };
  },
  methods: {
    isMatch(info) {
      console.log(info.profile.id)
      if (localStorage.getItem("Token")) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("Token")
          }
        };
        const data = {
          "is_match": true
        };
        // const user_id = localStorage.getItem("user_id");
        axios
          .patch("http://127.0.0.1:8000/api/like/" + info.profile.id + "/", data, config)
          .then(response => {
            console.log(response.data);
          })
          .catch(err => console.log(err));
      } else {
        console.log("coucou");
        // this.$router.push("/login");
      }
    },
    deleteMatch(id) {
      console.log(id)
      if (localStorage.getItem("Token")) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("Token")
          }
        };
        
        // const user_id = localStorage.getItem("user_id");
        axios
          .delete("http://127.0.0.1:8000/api/like/" + id + "/", config)
          .then(response => {
            console.log(response.data);
          })
          .catch(err => console.log(err));
      } else {
        console.log("coucou");
        // this.$router.push("/login");
    }
  },
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