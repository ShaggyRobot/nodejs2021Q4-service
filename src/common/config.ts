/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config({
  path: path.join(_dirname, '../../.env'),
});

export default {
  PORT: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
    ...(process.env.NODE_ENV === 'production' && { host: '0.0.0.0' }),
  },
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LVL: process.env.LOG_LVL,
  PG_USER: process.env.POSTGRES_USER,
  PG_PASS: process.env.POSTGRES_PASSWORD,
  PG_DB: process.env.POSTGRES_DB,
  PG_PORT: process.env.POSTGRES_PORT,
};
