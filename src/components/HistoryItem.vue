<template>
  <div class="history-item">
    <p>
      {{ historyItem.email }}
      <button @click="$emit('copy-email', historyItem.id)">Copy</button>
      <button @click="$emit('go-to-inbox', historyItem.id)">Inbox</button>
      <button @click="$emit('del-history-item', historyItem.id)" class="del">
        x
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "HistoryItem",
  props: ["historyItem"],
  methods: {},
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
