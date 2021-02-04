<template>
  <div class="row main-area">
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
        />
        <!-- <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
    ></chat-window> -->
      </div>
      <MessageInput />
    </div>
  </div>
</template>

<script>
// import ChatWindow from "vue-advanced-chat";
// import "vue-advanced-chat/dist/vue-advanced-chat.css";

import Users from "@/components/Chatbox/User";
import Chatbox from "@/components/Chatbox/Chatbox";
import MessageInput from "@/components/Chatbox/MessageInput"
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
    };
  },
  methods: {
    roomData(data) {

      this.active_chat_id = data.users.id
      this.messages = data.users.messages
      console.log(data.users.messages);
    }
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
          // console.log(response.data);
          // const messages = [];
          // response.data.forEach((element) =>
          //   element.messages.forEach((el) => {
          //     let message = {
          //       _id: el.id,
          //       content: el.message,
          //       sender_id: el.sender_id,
          //     };
          //     messages.push(message);
          //   })
          // );
          // this.messages = messages;

          const rooms = [];

          for (let i = 0; i < response.data.length; i++) {
            // let room ={ 
            //   roomId: response.data[i].id,
            //   roomName: response.data[i].from_user.user,
            //   users: [
            //     {
            //       _id: response.data[i].from_user.id,
            //       username: response.data[i].from_user.user,
            //     },
            //     {
            //       _id: this.currentUserId,
            //       username: localStorage.getItem("username"),
            //     },
            //   ],
            //   typingUsers: [this.currentUserId],
            // };
            // console.log(Object.values(room));
            let room = response.data[i]
            rooms.push(room);
          }
          this.rooms = rooms;
          // for (let message of this.messages) {
          //   this.messages.push(message)
          // }
          // console.log(this.rooms);
        })
        .catch((err) => console.log(err));
    } else {
      this.$router.push("/login");
    }
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
