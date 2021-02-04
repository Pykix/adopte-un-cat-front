<template>
  <div class="card" v-on:click="roomData">
      <div class="card-body">
         <h3 class="card-title">{{ users.from_user.user }}</h3>
      </div>
        
      </div>
</template>

<script>

export default {
  name: "Users",
  props: {
      users: Object
  },

  data() {
    return {
        activeUser: null,
    };
  },
  methods: {
      roomData() {
          this.$emit("roomData", this.$props);
        }
  },
  
};
</script>

<style lang="scss" scoped>
.user {
      margin: 0px !important;
      padding: 10px 4px 10px 8px;
      border-bottom: 1px solid gray;
    }
    .active {
      background: #17a2b8;
      color: white;
    }
    .has_new_message {
      background-color: #17a2b8;
      border-radius: 4px;
      display: inline-block;
      color: white;
      margin-bottom: -4px;
      font-size: 10px;
      margin: 4px;
      padding: 3px;
      font-weight: bolder;
    }
</style>