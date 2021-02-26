const { app, BrowserWindow } = require("electron");
const { devMode } = require("./environment");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 260,
    height: 400,
    show: false,
    center: true,
    resizable: true,
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
    win.webContents.openDevTools({ mode: "detach" });
  }

  win.loadFile("./src/assets/templates/app.html");

  win.removeMenu();

  win.once("ready-to-show", () => {
    win.show();
    win.focus();
  });

  win.on("closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
  });
};

app.on("ready", createWindow);
