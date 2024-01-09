import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { log } from "../utils/log.js";

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 2e7,
});

let roomUsers: Record<string, string[]> = {};

io.on("connection", (socket) => {
  io.emit("users_response", roomUsers);
  log(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    roomUsers = {
      ...roomUsers,
      [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
    };

    io.emit("users_response", roomUsers);
    log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing_response", data);
  });

  socket.on("disconnect", () => {
    log("User Disconnected " + socket.id);
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
