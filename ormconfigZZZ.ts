// {
//   "name": "mc1",
//   "type": "postgres",
//   "host": "localhost",
//   "port": 4040,
//   "cache": false,
//   "username": "process.env.POSTGRES_USER",
//   "password": "process.env.POSTGRES_PASSWORD",
//   "database": "process.env.POSTGRES_DATABASE",
//   "synchronize": false,
//   "logging": false,
//   "entities": "['./src/postgresDB/entities/*{.ts, .js}']",
//   "migrations": "['./src/postgresDB/migrations/*.ts']"
// }

import { ConnectionOptions } from 'typeorm';

export default {
  name: 'mc1',
  type: 'postgres',
  host: 'localhost',
  port: 4040,
  cache: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['./src/postgresDB/entities/*.{ts,js}'],
  migrations: ['./src/postgresDB/migrations/*.{ts,js}'],
} as ConnectionOptions;
