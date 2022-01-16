import Fastify, { FastifyInstance } from 'fastify';
import typeorm from 'typeorm';

import cfg from './common/config.js';
import log from './logger/logger.js';

import routeUsers from './routes/users.routes.js';
import routeTasks from './routes/tasks.routes.js';
import routeBoards from './routes/boards.routes.js';

const { createConnection, Connection, getConnectionOptions } = typeorm;

const app: FastifyInstance = Fastify({ logger: log });

app.register(routeUsers);
app.register(routeTasks);
app.register(routeBoards);

app.addHook('onError', request => {
  if (request.body) {
    app.log.error({ reqID: request.id, body: request.body });
  }
  process.exit(1);
});

app.addHook('preHandler', (request, reply, done) => {
  request.log.info({
    reqID: request.id,
    ...(request.body ? { body: request.body } : {}),
    requestParams: request.params,
  });
  done();
});

const connection = createConnection('njs-postgres');

connection.then(conn => console.log('connected to ======>> ', conn));
// IIFE
(async (): Promise<void> => {
  try {
    app.listen(cfg.PORT);
    app.log.info(`Running in ${process.env.NODE_ENV} mode.`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
