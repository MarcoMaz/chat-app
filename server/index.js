const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const CLIENT_PORT = 3000;
const SERVER_PORT = 8000;

const socketIO = require("socket.io")(http, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
  },
});

// Middlewares
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log("Connected!!", socket.id);

  socket.on("message", (data) => {
    console.log('message', data);
    socketIO.emit("messageResponse", data);
  });

  socket.on("chatAppName", (data) => {
    socketIO.emit("chatAppNameResponse", data);
  });

  socket.on("removeLastMessage", () => {
    socketIO.emit("removeLastMessageResponse");
  });

  socket.on("typing", (data) => {
    socketIO.emit("typingResponse", data);
  });

  socket.on("stopTyping", (data) => {
    socketIO.emit("stopTypingResponse", data);
  });

  socket.on("smile", (data) => {
    socketIO.emit("smileResponse", data);
  });

  socket.on("wink", (data) => {
    socketIO.emit("winkResponse", data);
  });

  socket.on("fadeLastMessage", (data) => {
    socketIO.emit("fadeLastMessageResponse", data);
  });

  socket.on("countdownMessage", (data) => {
    console.log('server', data)

    socketIO.emit("countdownMessageResponse", data);
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(SERVER_PORT, () => {
  console.log(`Server on port: ${SERVER_PORT}`);
});
