interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

let users: Array<IUser> = [];

function putUsersDb(newUsers: Array<IUser>): void {
  users = newUsers;
}

function getUsersDb(): Array<IUser> {
  return users;
}

export { putUsersDb, getUsersDb, IUser };
