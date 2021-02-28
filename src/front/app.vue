<template>
  <div class="frame">
    <div class="title">Elemine</div>
    <div class="window-button closer" onclick="window.close()">&times;</div>
  </div>
  <div class="page-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" rel="stylesheet/scss">
html {
  position: relative;
  width: 100%;
  height: 100%;
}

body {
  -webkit-user-select: none;
  overflow: hidden;
  font-family: "Arial", sans-serif;
  font-size: 12px;
  color: #fff;
  height: 100%;
  display: grid;
  grid-template-rows: 40px auto;
}

* {
  font-family: inherit;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: inherit;
}

.no-selectable {
  -webkit-user-select: none;
  cursor: default;
}

a,
a:visited,
a:hover {
  color: #fff;
  text-decoration: none;
}

.frame {
  position: relative;
  z-index: 10;
  background-color: #111b29;
  border-bottom: 1px solid #28313e;
  display: grid;
  grid-template-columns: auto 40px;
  -webkit-app-region: drag;

  .title {
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
  }

  .window-button {
    cursor: pointer;
    font-size: 20px;
    -webkit-app-region: none;
  }

  .window-button:hover {
    color: lightblue;
  }

  .window-button.closer {
    text-align: center;
    line-height: 40px;
  }
}
</style>
