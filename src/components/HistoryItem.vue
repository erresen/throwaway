<template>
  <div class="history-item">
    <p>
      {{ historyItem.email }}
      <a
        href="javascript:void(0);"
        type="button"
        class="btn"
        v-clipboard:copy="historyItem.email"
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
      <button @click="$emit('del-history-item', historyItem.email)" class="del">x</button>
    </p>
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
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.is-complete {
  text-decoration: line-through;
}

.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
