<template>
  <div class="col-auto" data-toggle="modal" data-target="#staticBackdrop">
    <div class="card mb-5">
      <img :src="profile.to_user.photo" class="card-img-top " alt="profile-picture" />
      <div class="card-body">
        <h3 class="card-title">{{ profile.to_user.user | capitalize }}</h3>
        <hr />
        <h5>Hobby</h5>
        <p class="card-text">{{ profile.to_user.hobby }}</p>
        <hr />
        <input type="hidden" name="likeId" :value="profile.id">
        <div class="d-flex flex-row justify-content-around flag">
          <i class="fas fa-heart" v-on:click="isMatch"></i>

          <i class="fas fa-user-alt" v-on:click="fullProfile"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: ["profile"],
  data() {
    return {};
  },
  methods: {
    // recupere les données du profil cliqué
    fullProfile() {
      this.$emit("fullProfile", this.$props);
    },
    isMatch() {
      
      this.$emit("isMatch", this.$props);
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.card {
  width: 18rem;
}

.card-img-top {
  width: 100%;
  height: 35vw;
  object-fit: cover;
}

.flag i {
  border: 1px solid #2c3e50;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
