const { v4: uuidv4 } = require('uuid');
const omitProp = require('../utils/omit-prop');
let users = require('../DB/users.db');
const { getTasksDb, putTasksDb } = require('../DB/tasks.db');

const getUsers = (req, rep) => {
  rep.send(users.map((user) => omitProp(user, 'password')));
};

const getUser = (req, rep) => {
  const { id } = req.params;

  const userToSend = users.find((user) => user.id === id);
  if (userToSend) {
    rep.send(omitProp(userToSend, 'password'));
  } else {
    rep.code(404).send({ message: `User ${id} not found.` });
  }
};

const addUser = (req, rep) => {
  const userProps = req.body;

  const user = {
    id: uuidv4(),
    ...userProps,
  };
  users = [...users, user];

  rep.code(201).send(omitProp(user, 'password'));
};

const updateUser = (req, rep) => {
  const userProps = req.body;
  const { id } = req.params;

  users = users.map((user) => (user.id === id ? { id, ...userProps } : user));
  const user = users.find((usr) => usr.id === id);

  rep.send(omitProp(user, 'password'));
};

const deleteUser = (req, rep) => {
  let tasks = getTasksDb();
  const { id } = req.params;

  users = users.filter((usr) => usr.id !== id);
  tasks = tasks.map((task) => {
    const tsk = task;
    if (tsk.userId === id) {
      tsk.userId = null;
    }
    return tsk;
  });
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
