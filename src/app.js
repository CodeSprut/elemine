const { app, ipcMain } = require("electron");
const { createWindow } = require("./window");
const processBuilder = require("./process-builder");

let window;

app.on("ready", () => {
  window = createWindow();

  ipcMain.on("run-game", (event, userData) => {
    processBuilder.run(userData);
  });
});
