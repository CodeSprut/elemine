module.exports = {
  publicPath: "./",
  outputDir: "./dist/front",
  productionSourceMap: false,
  configureWebpack: {
    target: "electron-renderer",
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
};
