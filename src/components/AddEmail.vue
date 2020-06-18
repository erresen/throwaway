<template>
  <div>
    <div class="generate-new-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 24 30"
        enable-background="new 0 0 24 30"
        xml:space="preserve"
        v-on:click="generateNew"
        title="Generate new email address"
      >
        <path
          d="M2,6v5a1,1,0,0,0,2,0V7H18.586L17.293,8.293a1,1,0,1,0,1.414,1.414l3-3a.99.99,0,0,0,.217-.326,1,1,0,0,0,0-.764.99.99,0,0,0-.217-.326l-3-3a1,1,0,0,0-1.414,1.414L18.586,5H3A1,1,0,0,0,2,6Z"
        />
        <path
          d="M21,12a1,1,0,0,0-1,1v4H5.414l1.293-1.293a1,1,0,0,0-1.414-1.414l-3,3a.99.99,0,0,0-.217.326,1,1,0,0,0,0,.764.99.99,0,0,0,.217.326l3,3a1,1,0,1,0,1.414-1.414L5.414,19H21a1,1,0,0,0,1-1V13A1,1,0,0,0,21,12Z"
        />
      </svg>
    </div>
    <div class="current-container">
      <div class="services-container">
        <div class="service-group">
          <label for="mailinator-radio">Mailinator</label>
          <input
            type="radio"
            id="mailinator-radio"
            value="mailinator"
            v-model="service"
            v-on:change="setEmailForPrefix"
          />
        </div>
        <div class="service-group">
          <label for="maildrop-radio">Maildrop</label>
          <input
            type="radio"
            id="maildrop-radio"
            value="maildrop"
            v-model="service"
            v-on:change="setEmailForPrefix"
          />
        </div>
      </div>
      <div class="email-container">
        <input type="text" name="email" placeholder="Email" v-model="email" />
        <a
          href="javascript:void(0);"
          type="button"
          class="btn"
          v-clipboard:copy="email"
          >Copy</a
        >
        <a
          :href="inboxUrl"
          type="button"
          class="btn"
          target="_blank"
          rel="noopener noreferrer"
          >Inbox</a
        >
      </div>
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
      inboxUrl: "",
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
      this.setEmailForPrefix();
    },
    setEmailForPrefix() {
      let domain = throwaway.getServiceDomain(this.service);
      this.email = `${this.prefix}@${domain}`;

      this.inboxUrl = throwaway.getInboxUrl(this.prefix, this.service);
    },
  },
  created() {
    this.generateNew();
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
  max-width: 764px;
  width: 100%;
  margin: 20px;
}
a.btn {
  padding: 19px 20px;
  text-decoration: none;
}
a.btn:hover {
  background-color: #000;
}
input[type="text"] {
  text-align: center;
  font-size: 1.5em;
  padding: 5px;
}
svg {
  width: 80px;
  cursor: pointer;
  fill: #555;
  margin: 20px 0;
}
svg:hover {
  fill: #000;
}
.service-group {
  display: inline-block;
  margin: 0 20px;
}
.service-group:hover {
  color: #000;
}
</style>
