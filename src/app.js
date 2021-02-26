const { app, BrowserWindow } = require("electron");
require("ejs-electron");

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
      // preload: path.join(__dirname, "app", "assets", "js", "preloader.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      devTools: true,
    },
    backgroundColor: "#171614",
  });

  win.webContents.openDevTools({ mode: "detach" });

  win.loadFile("./src/assets/templates/app.ejs");

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
