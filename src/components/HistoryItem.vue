<template>
  <div class="history-item">
    <div>{{ historyItem.email }}</div>
    <div class="btn-wide">
      <a
        href="javascript:void(0);"
        class="btn"
        v-clipboard:copy="historyItem.email"
        v-clipboard:success="onCopy"
      >Copy</a>
    </div>
    <div class="btn-wide">
      <a
        :href="inboxUrl"
        class="btn"
        target="_blank"
        rel="noopener noreferrer"
        v-on:click="onInboxClick"
      >Inbox</a>
    </div>
    <div class="btn-narrow">
      <a
        href="javascript:void(0);"
        class="btn"
        @click="$emit('del-history-item', historyItem.email)"
      >X</a>
    </div>
  </div>
</template>

<script>
import throwaway from "../throwaway";
export default {
  name: "HistoryItem",
  props: ["historyItem"],
  created() {
    let prefix = this.historyItem.email.split("@")[0];
    this.inboxUrl = throwaway.getInboxUrl(prefix, this.historyItem.service);
  },
  methods: {
    onCopy() {},
    onInboxClick() {}
  }
};
</script>

<style scoped>
.history-item {
  display: grid;
  grid-template-columns: auto 73px 73px 50px;
  background: #f4f4f4;
  align-items: center;
  max-width: 764px;
  width: 100%;
}
.btn-wide {
  width: 73px;
}
.btn-narrow {
  width: 50px;
}
</style>
