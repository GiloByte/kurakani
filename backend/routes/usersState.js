// adding server-side Users state
const UsersState = {
  users: [], // user: {id: string; username: string; rooms: string[]}
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

// User functions
// adding to the UsersState
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

// return user object from UsersState or undefined
function getUser(id) {
  return UsersState.users.find((user) => user.id === id);
}

// return array of user objects
function getUsersInRoom(roomId) {
  return UsersState.users.filter((user) => user.rooms.includes(roomId));
}

// returns an array of strings
function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.rooms).flat()));
}

// helper function for messages
function buildMsg(text, roomId) {
  return {
    text,
    socketId: "kurakani",
    roomId,
  };
}

// transforming UsersState to the format accepted by the front-end
function transformToLegacyFormat() {
  const allRooms = getAllActiveRooms();
  const result = {};
  allRooms.forEach((roomId) => {
    result[roomId] = getUsersInRoom(roomId).map((user) => user.id);
  });

  return result;
}

module.exports = {
  UsersState,
  transformToLegacyFormat,
  buildMsg,
  userLeavesRoom,
  activateUser,
  getUser,
  userLeavesApp,
  getAllActiveRooms,
  getUsersInRoom,
};
