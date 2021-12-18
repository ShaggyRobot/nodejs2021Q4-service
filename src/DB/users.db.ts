let users = [];

function putUsersDb(newUsers) {
  users = newUsers;
}

function getUsersDb() {
  return users;
}

export {putUsersDb, getUsersDb}
