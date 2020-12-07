<template>
  <div class="modal fade modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            {{ profile.user }}
          </h4>
          <button type="button" @click="$emit('close')" class="close"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          {{ profile.biography }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="$emit('close')">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileDetail",
  props: ["profile"]
};
</script>

<style scoped>
.modal-active {
  display: block;

}
.fade:not(.show) {
  opacity: 1;
}
.modal.fade .modal-dialog {
  transition: transform .3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 80%;
  min-height: 90vh;
  transform: translate(-50%, -50%);
}
</style>