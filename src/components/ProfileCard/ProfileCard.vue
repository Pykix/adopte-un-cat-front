<template>
  <div class="col-auto">
    <div class="card mb-5" v-on:click="fullProfile">
      <img :src="profile.photo" class="card-img-top " alt="profile-picture" />
      <div class="card-body">
        <h3 class="card-title">{{ profile.user | capitalize }}</h3>
        <hr />
        <h5>Hobby</h5>
        <p class="card-text">{{ profile.hobby }}</p>
        <hr />
        <h4>Il en moew plus</h4>
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
      clicked: false

    };
  },
  methods: {
    // recupere les données du profil cliqué
    fullProfile() {
      this.clicked = !this.clicked;
      this.$emit("fullProfile", this.$props);
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
</style>