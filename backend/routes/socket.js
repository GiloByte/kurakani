const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const debugPrint = require("../utils/debugPrint");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 2e7,
});

// adding server-side Users state
const UsersState = {
  users: [], // user: {id: string; username: string; rooms: string[]}
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

// User functions
function activateUser(id, username, roomId) {
  // finding if user present in UsersState
  const user = getUser(id);

  // default new user
  let newUser = {};

  // user already in the UsersState, updating user data
  if (user) {
    newUser = { ...user, rooms: [...user.rooms, roomId] };
  } else {
    newUser = {
      id,
      username,
      rooms: [roomId],
    };
  }

  // updating UsersState
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    newUser,
  ]);

  return newUser;
}

// remove user from a room
function userLeavesRoom(id, roomId) {
  const user = getUser(id);
  const updatedUser = {
    ...user,
    rooms: user.rooms.filter((room) => room !== roomId),
  };
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    updatedUser,
  ]);
}

// remove user from UsersState
function userLeavesApp(id) {
  UsersState.setUsers([...UsersState.users.filter((user) => user.id !== id)]);
}

function getUser(id) {
  return UsersState.users.find((user) => user.id === id);
}

function getUsersInRoom(roomId) {
  return UsersState.users.filter((user) => user.rooms.includes(roomId));
}

function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.rooms).flat()));
}

function buildMsg(text, roomId) {
  return {
    text,
    socketId: "kurakani",
    roomId,
  };
}

function transformToLegacyFormat(usersState) {
  const allRooms = getAllActiveRooms();
  const result = {};
  allRooms.forEach((roomId) => {
    result[roomId] = getUsersInRoom(roomId).map((user) => user.id);
  });

  return result;
}

io.on("connection", (socket) => {
  io.emit("users_response", transformToLegacyFormat(UsersState));
  debugPrint(`User Connected: ${socket.id}`);

  socket.on("join_room", ({ username, roomId }) => {
    // populating UsersState with a new user
    const user = activateUser(socket.id, username, roomId);

    // joining the room
    socket.join(roomId);

    // sending message to the joined user
    socket.emit(
      "receive_message",
      buildMsg(
        `You have joined the ${roomId === "1" ? "Global" : roomId} chat room`,
        roomId
      )
    );

    // to everyone else in the room
    socket.broadcast
      .to(roomId)
      .emit(
        "receive_message",
        buildMsg(`${user.username} has joined the room`, roomId)
      );

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
          buildMsg(`${user.username} has left the room`, roomId)
        );
      });
    }
  });

  socket.on("leave_room", ({ username, roomId }) => {
    userLeavesRoom(socket.id, roomId);
    io.emit(
      "receive_message",
      buildMsg(`${username} has left the room`, roomId)
    );
  });
});

module.exports = { app, server };
