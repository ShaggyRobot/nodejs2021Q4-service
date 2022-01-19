import { ITask } from '@src/DB/tasks.db';
import { IUser } from '@src/DB/users.db';

/**
 * Omits property from object
 * @param obj - object to omit property from
 * @param prop - property to be omitted from object
 * @returns object with the exception of omitted property
 */
function omitProp(obj: IUser | ITask, prop: string): IUser {
  const newObj = Object.fromEntries(Object.entries(obj).filter(entry => entry[0] !== prop));
  return newObj as IUser;
}

export default omitProp;
// module.exports = omitProp;
