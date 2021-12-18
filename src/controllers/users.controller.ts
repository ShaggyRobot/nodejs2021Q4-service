// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';
// const omitProp = require('../utils/omit-prop');
import omitProp from '@src/utils/omit-prop';

// const { getUsersDb, putUsersDb } = require('../DB/users.db');
import {putUsersDb, getUsersDb} from '@src/DB/users.db';

// const { getTasksDb, putTasksDb } = require('../DB/tasks.db');
import { putTasksDb, getTasksDb } from '@src/DB/tasks.db';

// GET /users - get all users (remove password from response)
const getUsers = (req, rep) => {
  const users = getUsersDb();
  rep.send(users.map(user => omitProp(user, 'password')));
};

// GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
const getUser = (req, rep) => {
  const users = getUsersDb();
  const { id } = req.params;

  const userToSend = users.find(user => user.id === id);
  if (userToSend) {
    rep.send(omitProp(userToSend, 'password'));
  } else {
    rep.code(404).send({ message: `User ${id} not found.` });
  }
};

// POST /users - create user
const addUser = (req, rep) => {
  let users = getUsersDb();
  const userProps = req.body;

  const user = {
    id: uuidv4(),
    ...userProps,
  };
  users = [...users, user];

  putUsersDb(users);
  rep.code(201).send(omitProp(user, 'password'));
};

// PUT /users/:userId - update user
const updateUser = (req, rep) => {
  let users = getUsersDb();
  const userProps = req.body;
  const { id } = req.params;

  users = users.map(user => (user.id === id ? { id, ...userProps } : user));
  const user = users.find(usr => usr.id === id);

  putUsersDb(users);
  rep.send(omitProp(user, 'password'));
};

// DELETE /users/:userId - delete user, all Tasks where User is assignee should be updated to put userId = null.
const deleteUser = (req, rep) => {
  let users = getUsersDb();
  let tasks = getTasksDb();
  const { id } = req.params;

  users = users.filter(usr => usr.id !== id);
  tasks = tasks.map(task => {
    const tsk = task;
    if (tsk.userId === id) {
      tsk.userId = null;
    }
    return tsk;
  });

  putUsersDb(users);
  putTasksDb(tasks);

  rep.send({ message: `User ${id} has been removed.` });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
