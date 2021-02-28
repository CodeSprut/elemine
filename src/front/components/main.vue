<template>
  <form v-on:submit="runGame" id="run-game">
    <select id="server-list"></select>
    <input id="nickname" type="text" required placeholder="Никнейм" />
    <button id="launch-button">Играть</button>
    <span id="status">{{ currentStatus }}</span>
  </form>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "main",
  data() {
    return {
      currentStatus: "Подключение...",
      serversList: [],
    };
  },
  async mounted() {
    ipcRenderer.on("loaded", (ev, { wsHost }) => {
      const client = new WebSocket(wsHost);

      client.onopen = () => {
        this.currentStatus = "Соединение установлено";
      };

      // client.onclose = event => {};

      client.onmessage = ({ data }) => {
        const message = JSON.parse(data);

        if (message.type === "servers-list") {
          this.serversList = message.data;
        }
        ipcRenderer.send("server-updates", message);
      };

      client.onerror = () => {
        this.currentStatus = "Ошибка подключения к серверу";
      };
    });
  },
  methods: {
    runGame(ev) {
      ev.preventDefault();

      ipcRenderer.send("run-game", {
        userData: {
          username: document.querySelector("input#nickname").value,
          uuid: "TmlsbA==",
          accessToken: "dummy_token",
        },
        clientName: this.serversList[0].name,
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
