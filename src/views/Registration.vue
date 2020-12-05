<template>
  <div class="container">
    <registration-form @change-form="switchForm" v-if="!goCreateProfile" />
    <profile-form v-else />
  </div>
</template>

<script>

import ProfileForm from "@/components/ProfileForm/ProfileForm";
import RegistrationForm from "@/components/ProfileForm/RegistrationForm";

export default {
  name: "Registration",
  components: {
    "profile-form": ProfileForm,
    "registration-form": RegistrationForm
  },
  data() {
    return {
      goCreateProfile: false
    };
  },
  methods: {
    switchForm() {
      this.goCreateProfile = true;
    }
  }
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