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
    <Footer />
    <CookieConsent />
  </div>
</template>

<script>
import EmailHistory from "./components/EmailHistory";
import AddEmail from "./components/AddEmail";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
export default {
  name: "App",
  components: {
    EmailHistory,
    AddEmail,
    Footer,
    CookieConsent
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
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

h1 {
  margin-top: 60px;
}

#app {
  font-family: Ubuntu, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
  transition: background 0.3s;
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
