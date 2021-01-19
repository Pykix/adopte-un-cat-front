<template>
  <div id="app">
    <navbar class="mb-5"></navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: {
    navbar: Nav
  }
};
</script>
<style lang="scss">
body {
  background: #2c3e50 !important;
}
</style>
