<template>
  <div>
    <div class="current-container">
      <div class="services-container">
        <label for="mailinator-radio">Mailinator</label>
        <input
          type="radio"
          id="mailinator-radio"
          value="mailinator"
          v-model="service"
        />
        <label for="maildrop-radio">Maildrop</label>
        <input
          type="radio"
          id="maildrop-radio"
          value="maildrop"
          v-model="service"
        />
      </div>
      <div class="email-container">
        <input type="text" name="email" placeholder="Email" v-model="email" />
        <input type="button" value="Copy" class="btn" />
        <input type="button" value="Inbox" class="btn" />
      </div>
    </div>
    <div class="generate-new-container">
      <input
        type="button"
        value="Generate"
        class="btn"
        v-on:click="generateNew"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import throwaway from "../throwaway";
export default {
  name: "AddEmail",
  data() {
    return {
      email: "",
      service: throwaway.defaultService,
      prefix: "",
    };
  },
  methods: {
    addToHistory(e) {
      e.preventDefault();

      const newHistoryItem = {
        id: uuidv4(),
        email: this.email,
        service: "maildrop",
      };
      this.$emit("add-history-item", newHistoryItem);
    },
    generateNew() {
      this.prefix = throwaway.generate();
      let domain = throwaway.getServiceDomain(this.service);
      this.email = `${this.prefix}@${domain}`;
    },
    goToInbox() {
      const inboxUrl = throwaway.getInboxUrl(this.prefix, this.service);
      window.open(inboxUrl, "_blank");
    },
  },
  created() {
    const prefix = throwaway.generate();
    this.email = prefix + "@mailinator.com";
  },
};
</script>

<style scoped>
.current-container {
  display: grid;
  justify-items: center;
  width: 100%;
}
.email-container {
  display: grid;
  grid-template-columns: auto 150px 150px;
  max-width: 1000px;
  width: 100%;
  margin: 20px;
}

input[type="text"] {
  text-align: center;
  font-size: 1.5em;
  padding: 5px;
}
</style>
