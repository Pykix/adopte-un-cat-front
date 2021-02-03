<template>
  <chat-window
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
  />
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
      currentUserId: localStorage.getItem("user_id"),
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
        .get("http://127.0.0.1:8000/api/message/", config)
        .then((response) => {
          console.log(response.data);
          const rooms = [];
          const messages = [];
          for (let i = 0; i < response.data.length; i++) {
            let message = {
              _id: response.data[i].id,
              content: response.data[i].message,
              sender_id: response.data[i].sender,
              timestamp: response.data[i].timestamp,
            };
            let room = 
              {
                roomId: response.data[i].like,
                roomName: "Test " + i,
                users: [
                  {
                    _id: response.data[i].sender_id,
                    username: response.data[i].receiver
                  },
                  {
                    _id: this.currentUserId,
                    username: response.data[i].sender
                  }
                ],
                typingUsers: [this.currentUserId]
              }
            console.log(room);
            if (Object.values(room).indexOf(response.data[i].like) > -1) {
              console.log("Bonjour")
              rooms.push(room);
            } else {
             console.log('aurevoir')
            }
            
            console.log(rooms);
            messages.push(message);
          }
          this.rooms = rooms;
          this.messages = messages;
          console.log(this.rooms);
        })
        .catch((err) => console.log(err));
    } else {
      this.$router.push("/login");
    }
  },
};
</script>