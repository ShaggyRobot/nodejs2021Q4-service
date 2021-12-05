const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// GET:
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: User,
      },
    },
  },
  handler: getUsers,
};

// GET: ID
const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

// POST:
const addUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: addUser,
};

// PUT:
const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

// DELETE:
const deleteUserOpts = {
  schema: {
    response: {
      200: {
        message: { type: 'string' },
      },
    },
  },
  handler: deleteUser,
};

function routesUsers(app, options, done) {
  app.get('/users', getUsersOpts);

  app.get('/users/:id', getUserOpts);

  app.post('/users', addUserOpts);

  app.put('/users/:id', updateUserOpts);

  app.delete('/users/:id', deleteUserOpts);

  done();
}

module.exports = routesUsers;
