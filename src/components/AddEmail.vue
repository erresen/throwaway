<template>
  <div>
    <form>
      <input type="radio" value="mailinator" v-model="service" />
      <input type="radio" value="maildrop" v-model="service" />
      <input type="text" name="email" placeholder="Email" v-model="email" />
      <input type="button" value="Copy" class="btn" />
      <input type="button" value="Inbox" class="btn" />
      <input
        type="button"
        value="Generate"
        class="btn"
        v-on:click="generateNew"
      />
    </form>
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
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

input [type="submit"] {
  flex: 2;
}
</style>
