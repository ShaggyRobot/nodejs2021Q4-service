const app = require('fastify')({ logger: true });
const { PORT } = require('./common/config');

app.register(require('./routes/users.routes'));
app.register(require('./routes/boards.routes'));
app.register(require('./routes/tasks.routes'));

// IIFE
(async () => {
  try {
    app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
