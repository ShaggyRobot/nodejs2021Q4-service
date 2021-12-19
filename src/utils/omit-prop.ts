import { IUser } from '@src/DB/users.db';

function omitProp(obj: IUser, prop: string): IUser {
  const newObj = Object.fromEntries(Object.entries(obj).filter(entry => entry[0] !== prop));
  return newObj as IUser;
}

export default omitProp;
// module.exports = omitProp;
