import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import typeorm from 'typeorm';

import ITask from '../postgresDB/interfaces/task.interface.js';
import Task from '../postgresDB/entities/taskEntity.js';

const { getConnection } = typeorm;
interface IreqTask extends RequestGenericInterface {
  Params: { id: string };
  Body: ITask;
}

// GET boards/:boardId/tasks - get all tasks
const getTasks = async (req: FastifyRequest<IreqTask>, rep: FastifyReply): Promise<void> => {
  const { id } = req.params;

  try {
    const tasks = await getConnection('myConn')
      .getRepository(Task)
      .createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId: id })
      .getMany();
    rep.send(tasks);
  } catch (error) {
    rep.code(500).send(error);
  }
};

// GET boards/:boardId/tasks/:taskId - get the task by id
const getTask = async (req: FastifyRequest<IreqTask>, rep: FastifyReply): Promise<void> => {
  // const tasks = getTasksDb();
  const { id } = req.params;

  try {
    const task = await getConnection('myConn')
      .getRepository(Task)
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOneOrFail();

    rep.send(task);
  } catch (error) {
    rep.code(404).send({ message: `Task with id ${id} not found.` });
  }
};

// POST boards/:boardId/tasks - create task
const addTask = async (req: FastifyRequest<IreqTask>, rep: FastifyReply): Promise<void> => {
  const taskProps = req.body;
  const boardId = req.params.id;

  const task = {
    id: uuidv4(),
    ...taskProps,
  };
  task.boardId = boardId;

  await getConnection('myConn')
    .createQueryBuilder()
    .insert()
    .into(Task)
    .values({ ...task })
    .execute();

  rep.code(201).send(task);
};

// PUT boards/:boardId/tasks/:taskId - update task
const updateTask = async (req: FastifyRequest<IreqTask>, rep: FastifyReply): Promise<void> => {
  const taskProps = req.body;
  const { id } = req.params;

  try {
    const task = await getConnection('myConn')
      .getRepository(Task)
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOneOrFail();

    await getConnection('myConn').createQueryBuilder().update(Task).set(taskProps).where('id = :id', { id }).execute();
    rep.code(200).send({ ...taskProps });
  } catch (error) {
    rep.code(404).send({ message: `Task with id ${id} not found.` });
  }
};

// DELETE boards/:boardId/tasks/:taskId - delete task
const deleteTask = async (req: FastifyRequest<IreqTask>, rep: FastifyReply): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await getConnection('myConn')
      .getRepository(Task)
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOneOrFail();

    await getConnection('myConn').createQueryBuilder().delete().from(Task).where('task.id = :id', { id }).execute();
    rep.code(204);
  } catch (error) {
    rep.code(404).send({ message: `Task with id ${id} not found.` });
  }
};

export { getTasks, getTask, addTask, updateTask, deleteTask };
