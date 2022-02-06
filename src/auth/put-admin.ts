import typeorm from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import IUser from '@src/postgresDB/interfaces/user.interface.js';
import User from '../postgresDB/entities/userEntity.js';

const { getConnection } = typeorm;

const admin = {
  name: 'admin',
  login: 'admin',
  password: 'admin',
};

const putUser = async (user: IUser): Promise<void> => {
  const dbUser = {
    id: uuidv4(),
    ...user,
  };

  dbUser.password = bcrypt.hashSync(dbUser.password, 10);

  const adminUser = await getConnection('myConn').getRepository(User).findOne({ login: 'admin' });

  if (!adminUser) {
    await getConnection('myConn').createQueryBuilder().insert().into(User).values(dbUser).execute();
  }
};

export default async (): Promise<void> => {
  putUser(admin);
};
