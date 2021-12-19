import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';

import { getTasksDb, putTasksDb, ITask } from '../DB/tasks.db.js';

interface IreqTask extends RequestGenericInterface {
  Params: { id: string | undefined };
  Body: ITask;
}

// GET boards/:boardId/tasks - get all tasks
const getTasks = (req: FastifyRequest<IreqTask>, rep: FastifyReply): void => {
  const tasks = getTasksDb();
  const { id } = req.params;
  console.log(id);
  const tasksToSend = tasks.filter(task => task.boardId === id);

  rep.send(tasksToSend);
};

// GET boards/:boardId/tasks/:taskId - get the task by id
const getTask = (req: FastifyRequest<IreqTask>, rep: FastifyReply): void => {
  const tasks = getTasksDb();
  const { id } = req.params;

  const taskToSend = tasks.find(task => task.id === id);

  if (taskToSend) {
    rep.send(taskToSend);
  } else {
    rep.code(404).send({ message: `Task ${id} not found.` });
  }
};

// POST boards/:boardId/tasks - create task
const addTask = (req: FastifyRequest<IreqTask>, rep: FastifyReply): void => {
  let tasks = getTasksDb();
  const taskProps = req.body;
  const boardId = req.params.id;

  const task = {
    id: uuidv4(),
    ...taskProps,
  };
  if (boardId !== 'undefined') {
    task.boardId = boardId;
  } else {
    task.boardId = undefined;
  }

  tasks = [...tasks, task];
  // console.log(tasks);
  putTasksDb(tasks);

  rep.code(201).send(task);
};

// PUT boards/:boardId/tasks/:taskId - update task
const updateTask = (req: FastifyRequest<IreqTask>, rep: FastifyReply): void => {
  let tasks = getTasksDb();
  const taskProps = req.body;
  const { id } = req.params;

  tasks = tasks.map(task => (task.id === id ? { id, ...taskProps } : task));
  const taskToSend = tasks.find(usr => usr.id === id);

  putTasksDb(tasks);

  rep.send(taskToSend);
};

// DELETE boards/:boardId/tasks/:taskId - delete task
const deleteTask = (req: FastifyRequest<IreqTask>, rep: FastifyReply): void => {
  let tasks = getTasksDb();
  const { id } = req.params;

  tasks = tasks.filter(tsk => tsk.id !== id);

  putTasksDb(tasks);

  rep.send({ message: `Task ${id} has been removed.` });
};

export { getTasks, getTask, addTask, updateTask, deleteTask };
