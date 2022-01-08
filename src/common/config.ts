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
};
