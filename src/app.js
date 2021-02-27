const { app, ipcMain } = require("electron");
const { createWindow } = require("./window");
const processBuilder = require("./process-builder");
const { projectDomain, server } = require("./config");

let window;

app.on("ready", () => {
  window = createWindow();

  window.webContents.on("did-finish-load", () => {
    const [, host] = projectDomain.split("//");
    const { protocol, path, port } = server;

    window.webContents.send("loaded", {
      wsHost: protocol + "://" + host + path + ":" + port,
    });
  });

  ipcMain.on("run-game", async (event, { userData, clientName }) => {
    const process = await processBuilder.run(userData, clientName);
  });

  ipcMain.on("server-updates", (event, data) => {
    console.log("ipcMain:", data);
  });
});
