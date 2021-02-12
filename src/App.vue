<template>
  <div id="app">
    <navbar class="mb-5"></navbar>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    navbar: Nav,
    foot: Footer
  }
};
</script>
<style lang="scss">
body {
  background: #2c3e50 !important;
}
</style>
