const app = require('fastify')({ logger: true });
const { PORT } = require('./common/config');

app.register(require('./routes/users'))

// app.get('/smth', (req, rep) => {
//   rep.send({ replywith: 'Hi, fucker!' });
// });

// app.get('/smth/:id', (req, rep) => {
//   const { id } = req.params;
//   const item = items.find((item) => {
//     item.id === id;
//   });
//   rep.send(item);
// });

const start = async () => {
  try {
    app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
