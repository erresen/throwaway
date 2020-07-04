<template>
  <div>
    <div v-bind:key="item.email" v-for="item in emailHistory" class="email-history">
      <HistoryItem
        v-bind:historyItem="item"
        v-on:del-history-item="$emit('del-history-item', item.email)"
      />
    </div>
    <div class="keep-history">
      <input
        id="keep-history"
        type="checkbox"
        v-model="shouldStoreHistory"
        v-on:change="toggleStoreHistory"
      />
      <label for="keep-history">Keep history for later</label>
    </div>
  </div>
</template>

<script>
import HistoryItem from "./HistoryItem";

export default {
  name: "EmailHistory",
  components: {
    HistoryItem
  },
  data() {
    return {
      shouldStoreHistory: false
    };
  },
  props: ["emailHistory", "storeHistory"],
  created() {
    this.shouldStoreHistory = this.storeHistory;
  },
  methods: {
    toggleStoreHistory() {
      this.$emit("store-history", this.shouldStoreHistory);
    }
  }
};
</script>

<style scoped>
.email-history {
  display: grid;
  justify-items: center;
  width: 100%;
}
div.keep-history {
  margin-top: 2em;
}
</style>
