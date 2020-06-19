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
        <span class="btn" v-on:click="generateNew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            enable-background="new 0 0 24 24"
            xml:space="preserve"
            title="Generate new email address"
          >
            <path
              d="M2,6v5a1,1,0,0,0,2,0V7H18.586L17.293,8.293a1,1,0,1,0,1.414,1.414l3-3a.99.99,0,0,0,.217-.326,1,1,0,0,0,0-.764.99.99,0,0,0-.217-.326l-3-3a1,1,0,0,0-1.414,1.414L18.586,5H3A1,1,0,0,0,2,6Z"
            />
            <path
              d="M21,12a1,1,0,0,0-1,1v4H5.414l1.293-1.293a1,1,0,0,0-1.414-1.414l-3,3a.99.99,0,0,0-.217.326,1,1,0,0,0,0,.764.99.99,0,0,0,.217.326l3,3a1,1,0,1,0,1.414-1.414L5.414,19H21a1,1,0,0,0,1-1V13A1,1,0,0,0,21,12Z"
            />
          </svg>
        </span>
        <span class="email">{{email}}</span>
        <a
          href="javascript:void(0);"
          type="button"
          class="btn"
          v-clipboard:copy="email"
          v-clipboard:success="onCopy"
        >Copy</a>
        <a
          :href="inboxUrl"
          type="button"
          class="btn"
          target="_blank"
          rel="noopener noreferrer"
          v-on:click="onInboxClick"
        >Inbox</a>
      </div>
    </div>
  </div>
</template>

<script>
import throwaway from "../throwaway";
export default {
  name: "AddEmail",
  data() {
    return {
      email: "",
      service: throwaway.defaultService,
      prefix: "",
      inboxUrl: ""
    };
  },
  methods: {
    addToHistory() {
      const newHistoryItem = {
        email: this.email,
        service: this.service
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
    onCopy() {
      this.addToHistory();
    },
    onInboxClick() {
      this.addToHistory();
    }
  },
  created() {
    this.generateNew();
  }
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
  grid-template-columns: 100px auto 100px 100px;
  max-width: 764px;
  width: 100%;
  margin: 20px;
  align-items: center;
}
a.btn {
  padding: 19px 20px;
}
span.email {
  font-family: "Ubuntu Mono", monospace;
  text-align: center;
  font-size: 1.5em;
  padding: 5px;
}
span.btn {
  padding-top: 12px;
  padding-bottom: 9px;
}
svg {
  width: 30px;
  cursor: pointer;
  fill: #fff;
}
.service-group {
  display: inline-block;
  margin: 0 20px;
}
.service-group:hover {
  color: #000;
}
</style>
