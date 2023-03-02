const express = require("express");
const app = express();
const PORT = 8000;
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Middlewares
app.use(cors());

socketIO.on('connection', (socket) => {
  console.log('Connected!!');
})


app.get("/api", (req, res) => {
  res.json({
    message: "first message",
  });
});

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});
