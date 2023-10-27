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

// legacy state
// let roomUsers = {};

// TEST START - adding new server side UsersState and its methods
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

// TODO use this function to get list of users in a room
function getUsersInRoom(roomId) {
  return UsersState.users.filter((user) => user.rooms.includes(roomId));
}

// TODO use this function to get a list of active rooms
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

// TODO consider replacing front-end state with new UsersState format
function transformToLegacyFormat(usersState) {
  const allRooms = getAllActiveRooms();
  const result = {};
  allRooms.forEach((roomId) => {
    result[roomId] = getUsersInRoom(roomId).map((user) => user.id);
  });

  return result;
}
// TEST END

io.on("connection", (socket) => {
  // converting new UsersState data to legacy state format for front-end compatibility
  // io.emit("users_response", roomUsers);
  io.emit("users_response", transformToLegacyFormat(UsersState));
  debugPrint(`User Connected: ${socket.id}`);

  // TEST
  // socket.on("join_room", (roomId) => {
  socket.on("join_room", ({ username, roomId }) => {
    // legacy state
    // roomUsers = {
    //   ...roomUsers,
    //   [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
    // };

    // TEST
    // TODO make a decision if changing rooms equals leaving them.

    // code below processes leaving previous room and updating rooms/users lists on room change
    // // leave previous room
    // const prevRoom = getUser(socket.id)?.roomId;

    // // previous room found. leaving the room and posting a message
    // if (prevRoom) {
    //   socket.leave(prevRoom);
    //   io.to(prevRoom).emit(
    //     "send_message",
    //     buildMsg(`${username} has left the room`, roomId)
    //   );
    // }

    // populating UsersState with a new user
    const user = activateUser(socket.id, username, roomId);

    // joining the room
    socket.join(roomId);

    // sending message to the joined user
    socket.emit(
      "receive_message",
      // TODO consider replacing roomId === 1 with some alias e.g. "Global"
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

    // TODO - this code updates users list for the room. Add front-end with users list.
    // updating user's users list for the room
    // io.to(user.roomId).emit("userList", {
    //   users: getUsersInRoom(user.roomId),
    // });

    // TODO this code updates list of rooms. Add front-end with active rooms.
    // // updating users list for the room for all
    // io.emit("roomList", {
    //   rooms: getAllActiveRooms(),
    // });

    // converting new UsersState data to legacy state format for front-end compatibility
    // io.emit("users_response", roomUsers);
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

    // legacy state
    // for (const [roomId, users] of Object.entries(roomUsers)) {
    //   if (users.includes(socket.id)) {
    //     roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
    //     // TEST hiding duplicate message
    //     // io.emit("receive_message", {
    //     //   text: `User ${socket.id} has left the room.`,
    //     //   socketId: "kurakani",
    //     //   roomId: roomId,
    //     // });
    //   }
    // }

    // TEST
    // getting user data from the UsersState
    const user = getUser(socket.id);

    // removing user from UsersState
    userLeavesApp(socket.id);

    // converting new UsersState data to legacy state format for front-end compatibility
    // io.emit("users_response", roomUsers);
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

      // TODO - this code updates users list for the room. Add front-end with users list.
      // updating users list in the room
      // io.to(user.room).emit("userList", {
      //   users: getUsersInRoom(user.room),
      // });

      // TODO this code updates list of rooms. Add front-end with active rooms.
      // updating rooms list in case this was the last user
      // io.emit("roomList", {
      //   rooms: getAllActiveRooms(),
      // });
    }
  });

  // TEST - leave room
  socket.on("leave_room", ({ username, roomId }) => {
    userLeavesRoom(socket.id, roomId);
    io.emit(
      "receive_message",
      buildMsg(`${username} has left the room`, roomId)
    );
  });
});

module.exports = { app, server };
