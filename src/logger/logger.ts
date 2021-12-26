import { pino, Logger, TransportMultiOptions } from 'pino';
// import PinoPretty from 'pino-pretty';
import cfg from '../common/config.js';

// const stream = PinoPretty({ colorize: true, ignore: 'pid,hostname', translateTime: 'HH:MM:ss' });
const transport = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: 'logs/log.txt',
        mkdir: true,
      },
    },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: 'logs/errors.log',
        mkdir: true,
      },
    },
    {
      target: 'pino-pretty',
      level: 'info',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss',
      },
    },
  ],
});

const log: Logger = pino(
  {
    level: cfg.LOG_LVL,
  },
  transport
);

export default log;
