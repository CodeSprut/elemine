<template>
  <form v-on:submit="runGame" id="run-game">
    <div class="status-bar">{{ currentStatus }}</div>
    <select :disabled="formDisabled" v-model="selectedServer">
      <option v-for="server in serversList" v-bind:value="server.name">
        {{ server.name }}
      </option>
    </select>
    <input
      id="nickname"
      type="text"
      required
      placeholder="Никнейм"
      :disabled="formDisabled"
    />
    <button id="launch-button" :disabled="formDisabled">Играть</button>
  </form>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "main",
  data() {
    return {
      currentStatus: "Подключение...",
      selectedServer: null,
      serversList: [],
      formDisabled: true,
    };
  },
  async mounted() {
    ipcRenderer.on("loaded", (ev, { wsHost }) => {
      const client = new WebSocket(wsHost);

      client.onopen = () => {
        this.formDisabled = false;
        this.currentStatus = "Соединение установлено";
      };

      client.onclose = () => {
        this.formDisabled = true;
        this.currentStatus = "Соединение разорвано";
      };

      client.onmessage = ({ data }) => {
        const message = JSON.parse(data);

        if (message.type === "servers-list") {
          this.serversList = message.data;
          this.selectedServer = this.serversList[0].name;
        }
        ipcRenderer.send("server-updates", message);
      };

      client.onerror = () => {
        this.formDisabled = true;
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
        clientName: this.selectedServer,
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#nickname {
  width: 140px;
  display: block;
  margin: 20px auto;
}

#launch-button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

#launch-button[disabled] {
  cursor: default;
}

select {
  margin: 0 auto;
  width: 100px;
  display: block;
}

.status-bar {
  text-align: center;
  padding: 10px 0;
}
</style>
