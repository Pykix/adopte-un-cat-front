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
    send_message() {
      this.$emit("sendMessage", this.sendMessage);
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