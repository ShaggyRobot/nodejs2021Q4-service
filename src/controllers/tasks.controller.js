const { v4: uuidv4 } = require('uuid');
const { getTasksDb, putTasksDb } = require('../DB/tasks.db');

const getTasks = (req, rep) => {
  const tasks = getTasksDb();
  const { id } = req.params;

  const tasksToSend = tasks.filter((task) => task.boardId === id);

  rep.send(tasksToSend);
};

const getTask = (req, rep) => {
  const tasks = getTasksDb();
  const { id } = req.params;

  const taskToSend = tasks.find((task) => task.id === id);

  if (taskToSend) {
    rep.send(taskToSend);
  } else {
    rep.code(404).send({ message: `Task ${id} not found.` });
  }
};

const addTask = (req, rep) => {
  let tasks = getTasksDb();
  const taskProps = req.body;
  const boardId = req.params.id;

  const task = {
    id: uuidv4(),
    ...taskProps,
  };
  task.boardId = boardId;

  tasks = [...tasks, task];
  putTasksDb(tasks);

  rep.code(201).send(task);
};

const updateTask = (req, rep) => {
  let tasks = getTasksDb();
  const taskProps = req.body;
  const { id } = req.params;

  tasks = tasks.map((task) => (task.id === id ? { id, ...taskProps } : task));
  const taskToSend = tasks.find((usr) => usr.id === id);

  putTasksDb(tasks);

  rep.send(taskToSend);
};

const deleteTask = (req, rep) => {
  let tasks = getTasksDb();
  const { id } = req.params;

  tasks = tasks.filter((tsk) => tsk.id !== id);

  putTasksDb(tasks);

  rep.send({ message: `Task ${id} has been removed.` });
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
