<template>
  <div>
    <div v-for="(message, id) in messages" v-bind:key="id">
      <div
        class="chat-message col-md-5"
        v-bind:class="[
          message.sender_id != currentUser
            ? 'to-message'
            : 'from-message offset-md-7',
        ]"
      >
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chatbox",
  props: {
    messages: Array,
    currentUser: Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style >
.from-message {
  background: #17a2b8;
  color: white;
  border-radius: 3px;
  padding: 8px 2px;
  margin-bottom: 4px;
}
.to-message {
  background: rgb(201, 209, 209);
  color: rgb(41, 53, 52);
  border-radius: 3px;
  padding: 8px 2px;
  margin-bottom: 4px;
}
</style>