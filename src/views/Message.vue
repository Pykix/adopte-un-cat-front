<template>
  <div>
    <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
    />
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import axios from "axios";

export default {
  name: "Message",
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],
      messages: [],
      currentUserId: parseInt(localStorage.getItem("user_id")),
    };
  },
  mounted() {
    if (localStorage.getItem("Token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("Token"),
        },
      };

      axios
        .get("http://127.0.0.1:8000/api/like/", config)
        .then((response) => {
          console.log(response.data);
          const rooms = [];
          const messages = [];
          for (let i = 0; i < response.data.length; i++) {
            let message = {
              _id: response.data[i].messages.id,
              content: "message 1",
              sender_id: response.data[i].from_user.id,
            };
            messages.push(message);
            let room = {
              roomId: response.data[i].id,
              roomName: response.data[i].from_user.user,
              users: [
                {
                  _id: response.data[i].from_user.id,
                  username: response.data[i].from_user.user,
                },
                {
                  _id: this.currentUserId,
                  username: localStorage.getItem("username"),
                },
              ],
              typingUsers: [this.currentUserId],
            };
            // console.log(Object.values(room));
            rooms.push(room);
          }
          this.rooms = rooms;
          this.messages = messages;
          console.log(this.messages);
        })
        .catch((err) => console.log(err));
    } else {
      this.$router.push("/login");
    }
  },
};
</script>