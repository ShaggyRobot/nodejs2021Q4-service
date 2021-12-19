import Fastify, { FastifyInstance } from 'fastify';
// import fastifySwagger, { StaticPathSpec } from 'fastify-swagger';

import cfg from './common/config.js';

import routeUsers from './routes/users.routes.js';
import routeTasks from './routes/tasks.routes.js';

const app: FastifyInstance = Fastify({ logger: false });

app.register(routeUsers);
app.register(routeTasks);
// app.register(require('./routes/boards.routes'));
// app.register(require('./routes/tasks.routes'));

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
    console.log(`Server is running at localhost:${cfg.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();

// node --loader ts-node/esm src/server.ts
