<template>
  <div>
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
        <a href="javascript:void(0);" type="button" class="btn">Copy</a>
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
    <div class="generate-new-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 125"
        enable-background="new 0 0 100 100"
        xml:space="preserve"
        v-on:click="generateNew"
        title="Generate new email address"
      >
        <path
          d="M94.884,50.372c-0.15-0.324-0.583-0.867-1.793-0.867h-8.294c-0.265-18.962-15.773-34.307-34.798-34.307  c-7.748,0-15.082,2.494-21.208,7.209c-0.415,0.319-0.674,0.781-0.73,1.303c-0.058,0.527,0.107,1.064,0.451,1.474l6.417,7.64  c0.665,0.79,1.937,0.927,2.793,0.306c3.57-2.592,7.816-3.962,12.277-3.962c11.321,0,20.563,9.079,20.826,20.337h-8.287  c-1.207,0-1.64,0.542-1.79,0.866c-0.151,0.323-0.288,1.003,0.488,1.927l15.13,18.017c0.382,0.453,0.896,0.703,1.448,0.703  c0.553,0,1.066-0.25,1.449-0.704L94.394,52.3C95.171,51.375,95.034,50.695,94.884,50.372z"
        />
        <path
          d="M65.058,67.16c-0.661-0.789-1.936-0.929-2.793-0.305c-3.577,2.601-7.817,3.976-12.264,3.976  c-11.321,0-20.562-9.079-20.826-20.337h8.286c1.207,0,1.64-0.543,1.791-0.867c0.15-0.323,0.288-1.003-0.488-1.927L23.633,29.686  c-0.764-0.908-2.133-0.908-2.897,0L5.606,47.701c-0.776,0.923-0.64,1.604-0.489,1.927c0.151,0.324,0.584,0.867,1.792,0.867h8.295  c0.266,18.961,15.773,34.306,34.798,34.306c7.636,0,15.168-2.561,21.209-7.21c0.414-0.318,0.673-0.781,0.729-1.303  c0.058-0.527-0.107-1.064-0.451-1.474L65.058,67.16z"
        />
      </svg>
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
  max-width: 1000px;
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
