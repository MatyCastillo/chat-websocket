const socket = io();
let input = document.getElementById("message");
let user = document.getElementById("user");
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value) {
      socket.emit("message", { user: user.value, message: e.target.value });
    }
  }
});
socket.on("wellcome", (data) => {
  alert(data);
});
socket.on("messagelog", (data) => {
  let p = document.getElementById("log");
  let mensajes = data
    .map((message) => {
      return `<div><span>${message.user} Dice:  ${message.message}</span></div>`;
    })
    .join("");
  p.innerHTML = mensajes;
});
