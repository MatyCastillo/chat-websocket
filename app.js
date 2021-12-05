const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
const io = new Server(server);
let messages = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("cliente conectado");
  //para pasar infomracion cliente servidor
  socket.emit("messagelog", messages);
  socket.emit("wellcome", "BIENVENIDO A MI SERVIDOR");

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagelog", messages);
  });
});
