const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

// GET:
const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        tasks: Task,
      },
    },
  },
  handler: getTasks,
};

// GET: ID
const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

// POST:
const addTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: [
        'title',
        'order',
        'description',
        'userId',
        'boardId',
      ],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: 'string' },
        columnId: { type: ['string', 'null'] },
      },
    },
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

// PUT:
const updateTasksOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

// DELETE:
const deleteTasksOpts = {
  schema: {
    response: {
      200: {
        message: { type: 'string' },
      },
    },
  },
  handler: deleteTask,
};

function routesTAsks(app, options, done) {
  app.get('/boards/:id/tasks', getTasksOpts);

  app.get('/boards/:id/tasks/:id', getTaskOpts);

  app.post('/boards/:id/tasks', addTaskOpts);

  app.put('/boards/:id/tasks/:id', updateTasksOpts);

  app.delete('/boards/:id/tasks/:id', deleteTasksOpts);

  done();
}

module.exports = routesTAsks;
