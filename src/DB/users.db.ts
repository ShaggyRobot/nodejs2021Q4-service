interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

let users: Array<IUser> = [];

/**
 * Replaces existing users array with updated users array
 * @param newUsers - new users array
 */
function putUsersDb(newUsers: Array<IUser>): void {
  users = newUsers;
}

/**
 * Returns all users
 * @returns array of users
 */
function getUsersDb(): Array<IUser> {
  return users;
}

export { putUsersDb, getUsersDb, IUser };
