<template>
  <div id="app">
    <h1>throwaway</h1>
    <AddEmail v-on:add-history-item="addHistoryItem" />
    <EmailHistory
      v-bind:emailHistory="emailHistory"
      v-bind:storeHistory="shouldStoreHistory"
      v-on:del-history-item="deleteHistoryItem"
      v-on:store-history="setHistoryStorage"
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
    AddEmail
  },
  data() {
    return {
      emailHistory: [],
      shouldStoreHistory: false
    };
  },
  methods: {
    deleteHistoryItem(email) {
      this.emailHistory = this.emailHistory.filter(
        history => history.email !== email
      );

      if (this.shouldStoreHistory) {
        this.storeHistory();
      }
    },
    addHistoryItem(historyItem) {
      var currentEmails = this.emailHistory.map(h => {
        return h.email;
      });

      if (currentEmails.includes(historyItem.email)) {
        return;
      }

      this.emailHistory = [historyItem, ...this.emailHistory];

      if (this.shouldStoreHistory) {
        this.storeHistory();
      }
    },
    storeHistory() {
      let history = JSON.stringify(this.emailHistory);
      localStorage.setItem("stored-history", history);
    },
    removeStoredHistory() {
      localStorage.removeItem("stored-history");
    },
    setHistoryStorage(shouldStore) {
      if (shouldStore) {
        this.shouldStoreHistory = true;
        this.storeHistory();
      } else {
        this.shouldStoreHistory = false;
        this.removeStoredHistory();
      }
      localStorage.setItem("store-history", this.shouldStoreHistory);
    }
  },
  created() {
    let shouldStore = localStorage.getItem("store-history");
    console.log(`should store ${shouldStore}`);
    if (shouldStore === "true") {
      this.shouldStoreHistory = true;
      let history = localStorage.getItem("stored-history");
      if (history) {
        this.emailHistory = JSON.parse(history);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Ubuntu, Avenir, Helvetica, Arial, sans-serif;
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
  font-size: 3em;
  color: #222;
  font-family: Staatliches, cursive;
}

a.btn {
  text-decoration: none;
}
a.btn:hover {
  background-color: #000;
}
span.btn:hover {
  background-color: #000;
}
</style>
