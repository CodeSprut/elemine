const childProcess = require("child_process");
const { promises: fs } = require("fs");
const { execPath } = require("./environment");

const getClientInfo = async path => {
  const fileData = await fs.readFile(`${path}\\minecraft.json`, {
    encoding: "utf-8",
  });

  return JSON.parse(fileData);
};

const getLibrariesList = async path => {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files = entries
    .filter(file => !file.isDirectory())
    .map(file => path + "\\" + file.name);

  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders) {
    files.push(...(await getLibrariesList(`${path}\\${folder.name}`)));
  }

  return files;
};

const prepareArguments = async (userData, clientData, options) => {
  const { gameDirectory, fullscreen = false } = options;
  const librariesPath = gameDirectory + "\\libraries";
  const jarList = await getLibrariesList(librariesPath);

  jarList.push(gameDirectory + "\\minecraft.jar");

  const params = [
    "-Xmn128M",
    "-Xms2G",
    "-Xmx2G",
    `-Djava.library.path=${gameDirectory}\\natives`,
    "-cp",
    jarList.join(";"),
    clientData.className,
    "--username",
    userData.username,
    "--version",
    clientData.version,
    "--gameDir",
    gameDirectory,
    "--assetsDir",
    `${gameDirectory}\\assets`,
    "--assetIndex",
    clientData.assetsIndex,
    "--uuid",
    userData.uuid,
    "--accessToken",
    userData.accessToken,
    "--userType",
    "offline",
    "--fullscreen",
    "true",
    ...clientData.arguments,
  ];

  if (fullscreen) {
    params.push("--fullscreen");
    params.push("true");
  }

  return params;
};

const run = async (userData, clientName) => {
  const gameDirectory = execPath + "\\" + clientName;
  const clientData = await getClientInfo(gameDirectory);
  const processArguments = await prepareArguments(userData, clientData, {
    gameDirectory,
  });

  const gameProcess = childProcess.spawn("java", processArguments, {
    cwd: gameDirectory,
    detached: true,
  });

  gameProcess.stdout.on("data", data => console.log(data.toString()));
  gameProcess.stderr.on("data", data => console.error(data.toString()));

  gameProcess.on("close", code => {
    console.log("Process closed with code:", code);
  });

  return gameProcess;
};

module.exports = {
  run,
};
