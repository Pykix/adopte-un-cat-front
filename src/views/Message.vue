<template>
  <div class="row main-area" v-if="!rooms">
    <div class="user col-4">
      <Users
        v-for="(user, index) in rooms"
        :key="index"
        :users="user"
        @roomData="roomData"
      />
    </div>
    <div class="messages-area col-8">
      <div class="messages-main">
        <div v-if="!rooms" class="select-chat text-center">
          Vous n'avez pas encore de conversation...
        </div>

        <Chatbox
          v-else
          :messages="messages"
          :currentUser="currentUserId"
          :key="componentKey"
        />
      </div>
      <MessageInput @sendMessage="sendMessage" />
    </div>
  </div>
  <div v-else class="text-center">
    Vous n'avez pas encore de conversation !
  </div>
</template>

<script>
// import ChatWindow from "vue-advanced-chat";
// import "vue-advanced-chat/dist/vue-advanced-chat.css";

import Users from "@/components/Chatbox/User";
import Chatbox from "@/components/Chatbox/Chatbox";
import MessageInput from "@/components/Chatbox/MessageInput";
import axios from "axios";

export default {
  name: "Message",
  components: {
    Chatbox,
    Users,
    MessageInput,
  },
  data() {
    return {
      rooms: [],
      messages: [],
      active_chat_id: null,
      currentUserId: parseInt(localStorage.getItem("user_id")),
      receiver: null,
      componentKey: 0,
    };
  },
  methods: {
    roomData(data) {
      this.receiver =
        data.users.to_user.id == this.currentUserId
          ? data.users.from_user.user
          : data.users.to_user.id;
      this.active_chat_id = data.users.id;
      this.messages = data.users.messages;
      // console.log(this.messages);
    },
    sendMessage(message) {
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("Token"),
          },
        };
      if (localStorage.getItem("Token")) {
        
        const data = {
          sender: localStorage.getItem("username"),
          sender_id: this.currentUserId,
          receiver: this.receiver,
          message: message,
          like: this.active_chat_id,
        };
        axios
          .post("http://127.0.0.1:8000/api/message/", data, config)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      axios
        .get("http://127.0.0.1:8000/api/like/", config)
        .then((response) => {
          const rooms = [];

          for (let i = 0; i < response.data.length; i++) {
            let room = response.data[i];
            rooms.push(room);
          }
          this.rooms = rooms;
        })
        .catch((err) => console.log(err));
    },
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
          const rooms = [];

          for (let i = 0; i < response.data.length; i++) {
            let room = response.data[i];
            rooms.push(room);
          }
          this.rooms = rooms;
        })
        .catch((err) => console.log(err));
    } else {
      this.$router.push("/login");
    }
    this.componentKey += 1;
  },
};
</script>

<style lang="scss" >
.messages-main {
  overflow-y: scroll;
  height: 90%;
}
.users {
  padding: 0px !important;
  border: 1px solid gray;
}
.no-margin {
  margin: 0px;
}
.messages-area {
  border: 1px solid gray;
  padding: 0px !important;
  max-height: calc(100vh - 4em) !important;
}
.input-message {
  height: 40px;
}
.active {
  background: #17a2b8 !important;
  border: #17a2b8 !important;
}
.select-chat {
  margin-top: 35vh;
  padding: 8px;
}
.main-area {
  margin: 0px;
  min-height: calc(100vh - 5em) !important;
}
.logged_user {
  color: white;
}
</style>