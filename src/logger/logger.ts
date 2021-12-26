import { pino, Logger } from 'pino';
import PinoPretty from 'pino-pretty';
import cfg from '../common/config.js';

const stream = PinoPretty({ colorize: true, ignore: 'pid,hostname', translateTime: 'HH:MM:ss' });

const log: Logger = pino(
  {
    level: cfg.LOG_LVL,
  },
  stream
);

export default log;
