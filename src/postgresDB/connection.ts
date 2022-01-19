import typeorm from 'typeorm';
import cfg from '../common/config.js';

import Task from './entities/taskEntity.js';
import User from './entities/userEntity.js';

const { createConnection } = typeorm;

export default function connect(): Promise<typeorm.Connection> {
  return createConnection({
    name: 'myConn',
    type: 'postgres',
    port: 5432,
    host: '198.0.0.2',
    migrationsRun: true,
    username: cfg.PG_USER,
    password: cfg.PG_PASS,
    database: cfg.PG_DB,
    entities: [User, Task],
    synchronize: true,
  });
}
