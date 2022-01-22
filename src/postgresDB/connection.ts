import typeorm from 'typeorm';
import cfg from '../common/config.js';

import Task from './entities/taskEntity.js';
import User from './entities/userEntity.js';
import Board from './entities/boardEntity.js';
import BoardColumn from './entities/columnEntity.js';

const { createConnection } = typeorm;

export default function connectDb(): Promise<typeorm.Connection> {
  return createConnection({
    name: 'myConn',
    type: 'postgres',
    port: 5432,
    host: '198.0.0.2',
    migrationsRun: false,
    synchronize: true,
    dropSchema: true,
    cache: false,
    username: cfg.PG_USER,
    password: cfg.PG_PASS,
    database: cfg.PG_DB,
    entities: [User, Task, Board, BoardColumn],
  });
}
