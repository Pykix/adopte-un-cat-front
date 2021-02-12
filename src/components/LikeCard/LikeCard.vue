<template>
  <div class="col-auto">
    <div v-bind:class="{ active: isFliped }" class="flip-box">
      <div class="flip-box-inner">
        <div class="card mb-5 flip-box-front">
          <img
            :src="profile.from_user.photo"
            class="card-img-top"
            alt="profile-picture"
          />
          <div class="card-body">
            <h3 class="card-title">
              {{ profile.from_user.user | capitalize }}
            </h3>
            <hr />
            <h5>Hobby</h5>
            <p class="card-text">{{ profile.from_user.hobby }}</p>
            <hr />
            <hr />
            <div class="d-flex flex-row justify-content-around flag">
              <i v-bind:class="{ like: isMatched }" class="fas fa-heart" v-on:click="isMatch"></i>
              <i class="fas fa-times" v-on:click="deleteMatch"></i>
              <i class="fas fa-user-alt" v-on:click="fullProfile"></i>
            </div>
          </div>
        </div>

        <div class="card mb-5 flip-box-back h-100 scroll">
          <div class="card-body d-flex flex-column">
            <div class="flex-grow-1">
              <h3 class="card-title">
                {{ profile.from_user.user | capitalize }}
              </h3>
              <hr />
              <h4>Profil</h4>
              <p class="card-text">{{ profile.from_user.biography }}</p>
              <hr />
              <h4>Hobby</h4>
              <p class="card-text">{{ profile.from_user.hobby }}</p>
              <hr />
              <h4>Couleur</h4>
              <p class="card-text">{{ profile.from_user.color }}</p>
              <hr />
              <hr />
            </div>
            <div class="d-flex flex-row justify-content-around flag mb-2">
              <i v-bind:class="{ like: isMatched }" class="fas fa-heart" v-on:click="isMatch"></i>
              <i class="fas fa-times" v-on:click="deleteMatch"></i>
              <i class="fas fa-arrow-left" v-on:click="close"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikeCard",
  props: ["profile"],
  data() {
    return {
      isFliped: false,
      isMatched: this.profile.is_match,
    };
  },
  methods: {
    // recupere les données du profil cliqué
    fullProfile() {
      this.isFliped = !this.isFliped;
    },
    isMatch() {
      this.isMatched = true;
      this.$emit("isMatch", this.$props);
    },
    deleteMatch() {
      this.$emit("deleteMatch", this.profile.id)
    },
    close() {
      this.isFliped = !this.isFliped;
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
  width: 20rem;
}

.card-img-top {
  width: 100%;
  height: 35vw;
  object-fit: cover;
}
.scroll {
  overflow-y: auto;
}
.flag i {
  border: 1px solid #2c3e50;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
}
.like {
  color: red;
}
.flip-box {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.active {
  background: none !important;
}
.flip-box.active .flip-box-inner {
  transform: rotateY(180deg);
}
.flip-box-front,
.flip-box-back {
  backface-visibility: hidden;
}
.flip-box-back {
  position: absolute;
  top: 0;
  transform: rotateY(180deg);
}
</style>
