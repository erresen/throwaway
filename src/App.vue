<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <CurrentEmail email="test@test.com" />
  </div>
</template>

<script>
import CurrentEmail from "./components/CurrentEmail.vue";

export default {
  name: "App",
  components: {
    CurrentEmail
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
