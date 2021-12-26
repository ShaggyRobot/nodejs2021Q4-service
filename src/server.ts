import Fastify, { FastifyInstance } from 'fastify';
// import fastifySwagger, { StaticPathSpec } from 'fastify-swagger';

import cfg from './common/config.js';
import log from './logger/logger.js';

import routeUsers from './routes/users.routes.js';
import routeTasks from './routes/tasks.routes.js';
import routeBoards from './routes/boards.routes.js';

const app: FastifyInstance = Fastify({ logger: log });

app.register(routeUsers);
app.register(routeTasks);
app.register(routeBoards);

// app.register(fastifySwagger, {
//   mode: 'dynamic',
//   routePrefix: '/doc',
//   exposeRoute: true,
//   specification: {
//     path: path.resolve('_dirname', '../doc/api.yaml'),
//   },
// });

// IIFE
(async (): Promise<void> => {
  try {
    app.listen(cfg.PORT || 3000);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();

// node --loader ts-node/esm src/server.ts
