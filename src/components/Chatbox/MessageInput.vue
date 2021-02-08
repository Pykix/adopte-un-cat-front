<template>
  <div >
      <input
      class="message-input"
        v-model="messageInput"
        type="text"
        placeholder="Enter your message"
        v-on:keyup.enter="sendMessage"
      >
  </div>
</template>

<script>
export default {
  name: "MessageInput",
  components: {},
  data() {
    return {
      messageInput: "",
    };
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.messageInput);
      this.messageInput = "";
    },
  },
};
</script>

<style scoped>
.message-input {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>