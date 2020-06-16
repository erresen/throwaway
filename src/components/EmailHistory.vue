<template>
  <div>
    <div v-bind:key="item.id" v-for="item in emailHistory">
      <HistoryItem
        v-bind:historyItem="item"
        v-on:del-history-item="$emit('del-history-item', item.id)"
      />
    </div>
  </div>
</template>

<script>
import HistoryItem from "./HistoryItem";

export default {
  name: "EmailHistory",
  components: {
    HistoryItem,
  },
  props: ["emailHistory"],
};
</script>

<style scoped></style>
