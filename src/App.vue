<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 8px;
  /*  height: 10px; */
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #063b5a27;
  border-radius: 5px;
}
</style>
