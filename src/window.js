const { app, BrowserWindow } = require("electron");
const { devMode } = require("./environment");

const createWindow = () => {
  let window = new BrowserWindow({
    width: 260,
    height: 400,
    show: false,
    center: true,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      devTools: devMode,
    },
    backgroundColor: "#171614",
  });

  if (devMode) {
    window.webContents.openDevTools({ mode: "detach" });
    window.loadURL("http://localhost:8080/");
  } else {
    window.loadFile("./dist/front/index.html");
  }

  window.removeMenu();

  window.once("ready-to-show", () => {
    window.show();
    window.focus();
  });

  window.on("closed", () => {
    window = null;
    if (process.platform !== "darwin") app.quit();
  });

  return window;
};

module.exports = {
  createWindow,
};
