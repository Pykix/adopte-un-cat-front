<template>
  <div>
    <h2 class="text-center">Encore un peu de chaperasse</h2>
    <form class="mx-auto">
      <div class="form-group">
        <p>Je suis</p>
        <input type="radio" id="male" value="M" v-model="gender" />
        <label for="male" class="ml-1">Male</label>
        <br />
        <input type="radio" id="female" value="F" v-model="gender" />
        <label for="female" class="ml-1">Femelle</label>
      </div>
      <div class="form-group">
        <p>Je recharche</p>
        <input type="radio" id="male_interest" value="M" v-model="interest" />
        <label for="male_interest" class="ml-1"> Male</label>
        <br />
        <input type="radio" id="female_interest" value="F" v-model="interest" />
        <label for="female_interest" class="ml-1">Femelle</label>
      </div>
      <div class="form-group">
        <label for="color">Couleur du pellage</label>
        <input
          type="text"
          placeholder="Roux"
          class="form-control"
          id="color"
          v-model="color"
        />
      </div>
      <div class="form-group">
        <label for="hobby">Hobby</label>
        <input
          type="text"
          placeholder="Tapenade"
          class="form-control"
          id="hobby"
          v-model="hobby"
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
          v-model="biography"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="">Une petite photo ?</label>
        <input type="file" accept="image/" class="file-input" ref="myFiles" @change="previewFiles">
      </div>
      <button @click.prevent="sendProfileInformation" class="btn btn-primary">Je valide mon profil !</button>
      <small>
        il sera modifiable a tout moment dans les parametres de ton
        compte</small
      >
    </form>
  </div>
</template>

<script>

import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "ProfileForm",
  data() {
    return {
      gender: null,
      interest: null,
      color: null,
      hobby: null,
      biography: null,
      photo: null
    };
  },
  methods: {
    sendProfileInformation() {
      const csrfToken = Cookies.get("csrftoken");
      const config = {
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: "Token " + localStorage.getItem("Token")
        }
      };
      // const img = new FormData();
      // img.append("photo", this.photo);
      // console.log(img)
      const data = {
        "gender": this.gender,
        "interested_gender": this.interest,
        "color": this.color,
        "hobby": this.hobby,
        "biography": this.biography,
       // "photo": img
      };
      const user_id = localStorage.getItem("user_id");
      axios
        .put(`http://localhost:8000/api/profiles/${user_id}/`, data, config)
        .then(r => console.log(r))
        .catch(err => console.log(err));
    },
    previewFiles: function(event) {
      this.photo = event.target.files[0].name;
      console.log(this.photo);
    }
    // uploadImg() {
    //   const img = new FormData();
    //   img.append("photo", this.photo, this.photo.name);
    //   console.log(img)
    //   return img;
    // }
  }
};
</script>

<style scoped>
form {
  width: 350px;
}
</style>
