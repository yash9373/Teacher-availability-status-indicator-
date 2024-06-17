const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});
app.use(cors());
let adminStatus = true;
let adminStatusTime = null;
let adminStatusDuration = null; // 1 minute

app.use(express.json());
app.post("/status", (req, res) => {
  console.log("Not Available Manual");
  const { time } = req.body;
  adminStatusTime = Date.now();
  adminStatusDuration = time * 1000;
  io.emit("new-data", { status: false });
  res.status(200).end();
});
app.post("/", (req, res) => {
  const data = req.body; // assuming you have a middleware to parse the request body

  console.log(data.status);
  console.log("New data received");
  if (!adminStatusTime || Date.now() - adminStatusTime > adminStatusDuration) {
    io.emit("new-data", data);
    data.status
      ? res.status(200).json({status:true}).end()
      : res.status(200).json({status:false}).end();
  }
});
app.post("/reset", (req, res) => {
  console.log("Reset");
  adminStatusTime = null;
  adminStatus = true;
  res.status(200).end();
});
io.on("connection", (socket) => {
  console.log(`A user Connected  ${socket.id}`);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
