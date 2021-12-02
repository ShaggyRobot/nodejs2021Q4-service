const { v4: uuidv4 } = require('uuid');
let users = require('../DB/users.db');

// const user = {
//   type: 'object',
//   properties: {
//     id: { type: 'string' },
//     name: { type: 'string' },
//     login: { type: 'string' },
//     password: { type: 'string' },
//   },
// };

const getUsers = (req, rep) => {
  rep.send(users);
};

const getUser = (req, rep) => {
  const { id } = req.params;
  const userToSend = users.find((user) => user.id === id);
  rep.send(userToSend);
};

const addUser = (req, rep) => {
  const { userProps } = req.body;
  const user = {
    id: uuidv4,
    userProps,
  };

  users = [...users, user];

  rep.code(201).send(user);
};

const updateUser = (req, rep) => {
  const { userProps } = req.body;
  const { id } = req.params;

  users = users.map((user) => (user.id === id ? { id, userProps } : user));
  const user = users.find((usr) => usr.id === id);

  rep.send(user);
};

const deleteUser = (req, rep) => {
  const { id } = req.params;

  users = users.filter((usr) => usr.id !== id);

  rep.send({ message: `User ${id} has been removed.` });
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
