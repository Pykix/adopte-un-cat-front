<template>
  <div>
    <h2 class="text-center">Encore un peu de chaperasse</h2>
    <form class="mx-auto">
      <div class="form-group">
        <label for="gender">Je suis</label>
        <select class="form-control" id="gender">
          <option value="F">une fille</option>
          <option value="M">une garçon</option>
        </select>
      </div>
      <div class="form-group">
        <label for="interest">Je recharche</label>
        <select class="form-control" id="interest">
          <option value="F">une fille</option>
          <option value="M">une garçon</option>
        </select>
      </div>
      <div class="form-group">
        <label for="color">Couleur du pellage</label>
        <input
          type="text"
          placeholder="Roux"
          class="form-control"
          id="color"
        />
      </div>
      <div class="form-group">
        <label for="hobby">Hobby</label>
        <input
          type="text"
          placeholder="Tapenade"
          class="form-control"
          id="hobby"
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
        ></textarea>
      </div>
      <button class="btn btn-primary">Je valide mon profil !</button>
      <small>il sera modifiable a tout moment dans les parametres de ton compte</small>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProfileForm"
};
</script>

<style scoped>
.container {
  color: aliceblue;
}

form {
  width: 350px;
}
</style>