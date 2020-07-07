<template>
  <div>
    <footer>
      <ul>
        <li>
          <a href="https://github.com/erresen/throwaway" target="_blank"
            >Throwaway Project</a
          >
        </li>
        <li>
          <a href="https://github.com/erresen" target="_blank">Github</a>
        </li>
        <li>
          <a href="https://erresen.github.io" target="_blank">Blog</a>
        </li>
        <li>
          <a href="https://erresen.github.io/privacy/" target="_blank"
            >Privacy Policy</a
          >
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterMenu",
};
</script>

<style scoped>
footer {
  display: grid;
  height: 60px;
}

ul {
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: 2em;
  justify-items: center;
  margin: auto;
  list-style: none;
  padding: 0;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
