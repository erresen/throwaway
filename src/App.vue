<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <AddEmail v-on:add-history-item="addHistoryItem" />
    <EmailHistory
      v-bind:emailHistory="emailHistory"
      v-on:del-history-item="deleteHistoryItem"
    />
  </div>
</template>

<script>
import EmailHistory from "./components/EmailHistory";
import AddEmail from "./components/AddEmail";
export default {
  name: "App",
  components: {
    EmailHistory,
    AddEmail,
  },
  data() {
    return {
      emailsHistory: [
        {
          id: 1,
          email: "test@mailinator.com",
          service: "mailinator",
        },
        {
          id: 2,
          email: "test2@mailinator.com",
          service: "mailinator",
        },
        {
          id: 3,
          email: "test3@maildrop.cc",
          service: "maildrop",
        },
      ],
    };
  },
  methods: {
    deleteHistoryItem(id) {
      this.emailsHistory = this.emailsHistory.filter(
        (history) => history.id !== id
      );
    },
    addHistoryItem(historyItem) {
      this.emailsHistory = [...this.emailHistory, historyItem];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
</style>
