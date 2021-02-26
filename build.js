const builder = require("electron-builder");
const Platform = builder.Platform;

function getCurrentPlatform() {
  switch (process.platform) {
    case "win32":
      return Platform.WINDOWS;
    case "darwin":
      return Platform.MAC;
    case "linux":
      return Platform.linux;
    default:
      console.error("Cannot resolve current platform!");
      return undefined;
  }
}

builder
  .build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null
      ? Platform[process.argv[2]]
      : getCurrentPlatform()
    ).createTarget(),
    config: {
      appId: "com.elemine.app",
      productName: "Elemine",
      artifactName: "${productName}Setup.${ext}",
      copyright: "Copyright © 2021 Codesprut",
      files: ["src", "node_modules", "LICENSE"],
      win: {
        target: [
          {
            target: "nsis-web",
            arch: "x64",
          },
          "portable",
        ],
      },
      nsisWeb: {
        oneClick: false,
        perMachine: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
      },
      portable: {
        artifactName: "${productName}.${ext}",
      },
      mac: {
        target: "dmg",
        category: "public.app-category.games",
      },
      linux: {
        target: "AppImage",
        maintainer: "Codesprut",
        vendor: "Codesprut",
        synopsis: "Minecraft Launcher",
        description:
          "Custom launcher which allows users to join modded servers.",
        category: "Game",
      },
      compression: "maximum",
      extraResources: ["libraries"],
      asar: true,
      publish: {
        provider: "generic",
        url: "https://website.zone/launcher",
      },
    },
  })
  .then(() => console.log("Build complete!"))
  .catch(err => console.error("Error during build!", err));
