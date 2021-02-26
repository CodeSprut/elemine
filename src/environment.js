const OS = require("os");
const path = require("path");
const execPath = process.execPath.match(/.*\\/i)[0];

module.exports = {
  execPath,
  appRoot: path.resolve(__dirname),
  devMode: process.argv[1] === ".",
  EOL: OS.EOL,
  homedir: OS.homedir(),
};
