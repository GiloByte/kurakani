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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("leave_all_rooms", (rooms) => {
    rooms.forEach((room) => {
      socket.leave(room.id);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/rooms", (req, res) => {
  const ROOMS = [
    {
      title: "Global Chatroom",
      id: "1",
      imageUrl: "https://kriteshtimsina.com.np/assets/kritesh-057690bd.jpg",
    },
    {
      title: "Nepali Guys",
      id: "2",
      imageUrl: "https://shreedeshniroula.com.np/images/profile1.jpg",
    },
  ];
  res.json(ROOMS);
});

server.listen(4000, () => {
  console.log("SERVER RUNNING");
});
