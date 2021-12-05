const app = require('fastify')({ logger: false });
const path = require('path');
const { PORT } = require('./common/config');

app.register(require('./routes/users.routes'));
app.register(require('./routes/boards.routes'));
app.register(require('./routes/tasks.routes'));

app.register(require('fastify-swagger'), {
  mode: 'static',
  exposeRoute: true,
  specification: {
    path: path.resolve('_dirname', '../doc/api.yaml'),
  },
});

// IIFE
(async () => {
  try {
    app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
