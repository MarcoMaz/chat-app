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
  console.log('Connected!!', socket.id);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(SERVER_PORT, () => {
  console.log(`Server on port: ${SERVER_PORT}`);
});
