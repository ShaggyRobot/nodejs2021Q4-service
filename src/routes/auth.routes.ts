import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import authenticate from '../controllers/auth.controller.js';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const IToken = {
  token: { type: 'string' },
};

const authUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: { token: { type: 'string' } },
    },
  },
  handler: authenticate,
};

function routesLogin(app: FastifyInstance, opts: RouteShorthandOptions, done: () => void): void {
  app.post('/login', authUserOpts);
  done();
}

export default routesLogin;
