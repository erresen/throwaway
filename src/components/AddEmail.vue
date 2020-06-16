<template>
  <div>
    <form @submit="addToHistory">
      <input type="text" name="email" placeholder="Email" v-model="email" />
      <input type="submit" value="Submit" class="btn" />
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "AddEmail",
  data() {
    return {
      email: "",
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
