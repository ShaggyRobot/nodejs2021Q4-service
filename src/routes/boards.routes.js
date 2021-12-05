const {
  getBoard,
  getBoards,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boards.controller');

const Column = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' },
  },
};

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      column: Column,
    },
  },
};

// GET
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        boards: Board,
      },
    },
  },
  handler: getBoards,
};

// GET:ID
const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

const addBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: { type: 'array', column: Column },
      },
    },
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

// PUT:
const updateBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};

// DELETE:
const deleteBoardOpts = {
  schema: {
    response: {
      200: {
        message: { type: 'string' },
      },
    },
  },
  handler: deleteBoard,
};

function routesBoards(app, options, done) {
  app.get('/boards', getBoardsOpts);

  app.get('/boards/:id', getBoardOpts);

  app.post('/boards', addBoardOpts);

  app.put('/boards/:id', updateBoardOpts);

  app.delete('/boards/:id', deleteBoardOpts);

  done();
}

module.exports = routesBoards;
