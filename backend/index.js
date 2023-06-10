const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let roomUsers = {};

io.on("connection", (socket) => {
  io.emit("users_response", roomUsers);
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    roomUsers = {
      ...roomUsers,
      [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
    };
    io.emit("users_response", roomUsers);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.includes(socket.id)) {
        roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
        io.emit("receive_message", {
          text: "A user left the room.",
          socketId: "kurakani",
          roomId: roomId,
        });
      }
    }
    io.emit("users_response", roomUsers);
  });
});

const ROOMS = [
  {
    title: "Global Chatroom",
    id: "1",
  },
];

app.get("/rooms", (req, res) => {
  res.json(ROOMS);
});

server.listen(4000, () => {
  console.log("SERVER RUNNING");
});
