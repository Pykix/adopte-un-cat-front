<template>
  <div class="text-center profile">
    <img class="w-100" :src="profileData.photo" alt="" />
    <div class="container">
      <form class="justify-content-start">
        <div class="form-group text-left">
          <div class="form-check">
            <p>Je recharche</p>
            <input
              type="radio"
              name="interest"
              id="male_interest"
              class="form-check-input"
              value="M"
              v-model="profileData.interested_gender"
            />
            <label for="male_interest" class="ml-1 form-check-label"
              >Male</label
            >
          </div>
          <div class="form-check">
            <input
              type="radio"
              name="interest"
              id="female_interest"
              class="form-check-input"
              value="F"
              v-model="profileData.interested_gender"
            />
            <label for="female_interest" class="ml-1 form-check-label"
              >Femelle</label
            >
          </div>
          <div class="form-group">
            <label for="color">Couleur du pellage</label>
            <input
              type="text"
              placeholder="Roux"
              class="form-control"
              id="color"
              v-model="profileData.color"
            />
          </div>
          <div class="form-group">
            <label for="hobby">Hobby</label>
            <input
              type="text"
              placeholder="Tapenade"
              class="form-control"
              id="hobby"
              v-model="profileData.hobby"
            />
          </div>
          <div class="form-group">
            <label for="biography">Biographie</label>
            <textarea
              type="text"
              placeholder="Meows-en plus sur toi "
              rows="15"
              class="form-control"
              id="biography"
              v-model="profileData.biography"
            ></textarea>
            <div class="form-group">
              <label for="photo">On Change la photo ?</label>
              <input
                @change="previewFiles"
                type="file"
                id="photo"
                accept="image/"
                class="file-input"
                ref="myFiles"
              />
            </div>
            <button
              @click.prevent="sendProfileInformation"
              class="btn btn-primary"
            >
              Je change mon profil !
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import ProfileForm from "@/components/ProfileForm/ProfileForm";
import axios from "axios";
import Cookies from "js-cookie";
import store from "@/store/store";

export default {
  name: "Profile",
  data() {
    return {
      profileData: ""
    };
  },

  components: {
    //'profile-form': ProfileForm
  },
  watch: {},
  methods: {
    sendProfileInformation() {
      const csrfToken = Cookies.get("csrftoken");
      const config = {
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: "Token " + localStorage.getItem("Token")
        }
      };

      const data = {
        gender: this.profileData.gender,
        interested_gender: this.profileData.interested_gender,
        color: this.profileData.color,
        hobby: this.profileData.hobby,
        biography: this.profileData.biography
      };
      const user_id = localStorage.getItem("user_id");

      axios
        .put(`http://localhost:8000/api/profiles/${user_id}/`, data, config)
        .then(r => console.log(r))
        .catch(err => console.log(err));
    },
    previewFiles: function(event) {
      const csrfToken = Cookies.get("csrftoken");
      const config = {
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: "Token " + localStorage.getItem("Token")
        }
      };
      this.photo = event.target.files[0];
      const photo = new FormData();
      photo.append("photo", this.photo, this.photo.name);
      axios
        .put("http://localhost:8000/api/avatar/", photo, config)
        .then(r => console.log(r))
        .catch(err => console.log(err));
    }
  },
  mounted() {
    if (store.state.isConnected) {
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
        .then(r => {
          this.profileData = r.data;
        });
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.profile {
  color: aliceblue;
}
</style>
