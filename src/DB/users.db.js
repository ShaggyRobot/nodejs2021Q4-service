let users = [];

function putUsersDb(newUsers) {
  users = newUsers;
}

function getUsersDb() {
  return users;
}

module.exports = { getUsersDb, putUsersDb };
