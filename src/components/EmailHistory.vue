<template>
  <div>
    <div v-bind:key="item.email" v-for="item in emailHistory" class="email-history">
      <HistoryItem
        v-bind:historyItem="item"
        v-on:del-history-item="$emit('del-history-item', item.email)"
      />
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
  props: ["emailHistory"]
};
</script>

<style scoped>
.email-history {
  display: grid;
  justify-items: center;
  width: 100%;
}
</style>
