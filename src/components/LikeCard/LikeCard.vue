<template>
  <div class="col-auto" data-toggle="modal" data-target="#staticBackdrop">
    <div class="card mb-5">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="profile.from_user.photo" class="img-fluid card-img" alt="profile-picture" />
        </div>
      
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">{{ profile.from_user.user | capitalize }}</h3>
          <hr />
          <h5>Hobby</h5>
          <p class="card-text">{{ profile.from_user.hobby }}</p>
          <hr />
          
          <input type="hidden" name="likeId" :value="profile.id">
          <div class="d-flex flex-row justify-content-around flag">
            <i v-if="!match" class="fas fa-heart" v-on:click="isMatch" v-bind:class="{liked: match}"></i>
            <i class="fas fa-user-alt" v-on:click="fullProfile"></i>
          </div>
        </div>
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
    return {
      match: false,
    };
  },
  computed: {},
  methods: {
    // recupere les données du profil cliqué
    fullProfile() {
      this.$emit("fullProfile", this.$props);
    },
    isMatch() {
      this.match = true;
      this.$emit("isMatch", this.$props);
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
  max-height: 250px;
}

.card-img {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.flag i {
  border: 1px solid #2c3e50;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
}
i .liked {
  color: red;
}
</style>
