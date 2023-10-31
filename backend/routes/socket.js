const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const debugPrint = require("../utils/debugPrint");
const {
  transformToLegacyFormat,
  activateUser,
  buildMsg,
  UsersState,
  getUser,
  userLeavesApp,
  userLeavesRoom,
} = require("./usersState");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 2e7,
});

io.on("connection", (socket) => {
  io.emit("users_response", transformToLegacyFormat(UsersState));
  debugPrint(`User Connected: ${socket.id}`);

  socket.on("join_room", ({ username, roomId }) => {
    // populating UsersState with a new user
    const user = activateUser(socket.id, username, roomId);

    // joining the room
    socket.join(roomId);

    // to everyone else in the room
    socket.broadcast
      .to(roomId)
      .emit("receive_message", buildMsg(`${user.username} has joined`, roomId));

    // converting new UsersState data to legacy state format for front-end compatibility
    io.emit("users_response", transformToLegacyFormat(UsersState));
    debugPrint(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing_response", data);
  });

  socket.on("disconnect", () => {
    debugPrint("User Disconnected", socket.id);

    // getting user data from the UsersState
    const user = getUser(socket.id);

    // removing user from UsersState
    userLeavesApp(socket.id);

    // converting new UsersState data to legacy state format for front-end compatibility
    io.emit("users_response", transformToLegacyFormat(UsersState));

    // post user disconnect actions
    if (user) {
      // sending user left message to the room
      user.rooms.forEach((roomId) => {
        io.emit(
          "receive_message",
          buildMsg(`${user.username} has left`, roomId)
        );
      });
    }
  });

  socket.on("leave_room", ({ username, roomId }) => {
    userLeavesRoom(socket.id, roomId);
    io.emit("receive_message", buildMsg(`${username} has left`, roomId));
  });
});

module.exports = { app, server };
