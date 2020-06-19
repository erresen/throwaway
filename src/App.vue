<template>
  <div id="app">
    <h1>throwaway</h1>
    <AddEmail v-on:add-history-item="addHistoryItem" />
    <EmailHistory v-bind:emailHistory="emailHistory" v-on:del-history-item="deleteHistoryItem" />
  </div>
</template>

<script>
import EmailHistory from "./components/EmailHistory";
import AddEmail from "./components/AddEmail";
export default {
  name: "App",
  components: {
    EmailHistory,
    AddEmail
  },
  data() {
    return {
      emailHistory: []
    };
  },
  methods: {
    deleteHistoryItem(email) {
      this.emailHistory = this.emailHistory.filter(
        history => history.email !== email
      );
    },
    addHistoryItem(historyItem) {
      var currentEmails = this.emailHistory.map(h => {
        return h.email;
      });

      if (currentEmails.includes(historyItem.email)) return;

      this.emailHistory = [historyItem, ...this.emailHistory];
    }
  }
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

h1 {
  letter-spacing: 1em;
  color: #555;
}
</style>
