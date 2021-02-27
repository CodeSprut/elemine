const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const { port } = require("./config");

const wss = new WebSocket.Server({ port });

const sendMessage = (ws, body) => {
  ws.send(JSON.stringify(body));
};

wss.on("connection", ws => {
  ws.id = uuidv4();

  sendMessage(ws, {
    type: "servers-list",
    data: [
      {
        name: "survival",
        ipAddress: "vm-bot.ru",
        port: 25565,
      },
    ],
  });

  ws.on("close", () => {
    console.log(`${ws.id} has disconnected`);
  });
});
