const io = require("socket.io")();
const { port } = require("./config");

io.on("connection", client => {
  console.log(client);
});
io.listen(port);
