const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

let rooms = {};

socketIO.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    if (rooms[roomId]) rooms[roomId].push(socket.id);
    else rooms[roomId] = [socket.id];
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    socketIO.emit("users_response", rooms);
  });

  socket.on("disconnect", () => {
    for (const [roomId, users] of Object.entries(rooms)) {
      users.filter((user) => user.socketID !== socket.id);
      rooms[roomId] = users;
    }
    socketIO.emit("users_response", rooms);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("/rooms", (req, res) => {
  const ROOMS = [
    {
      title: "Kritesh Timsina",
      id: "1",
      imageUrl: "https://kriteshtimsina.com.np/assets/kritesh-057690bd.jpg",
    },
    {
      title: "Shreedesh Niroula",
      id: "2",
      imageUrl: "https://shreedeshniroula.com.np/images/profile1.jpg",
    },
  ];
  res.json(ROOMS);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
