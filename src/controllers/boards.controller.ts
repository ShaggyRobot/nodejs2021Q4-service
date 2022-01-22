import { v4 as uuidv4 } from 'uuid';
import typeorm from 'typeorm';
import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';

import { IColumn } from '@src/postgresDB/interfaces/column.interface.js';

import Board from '../postgresDB/entities/boardEntity.js';
import Task from '../postgresDB/entities/taskEntity.js';

const { getConnection } = typeorm;

interface IreqBoards extends RequestGenericInterface {
  Params: { id: string };
  Body: { title: string; columns: IColumn[] };
}

// GET /boards - get all boards
const getBoards = async (req: FastifyRequest<IreqBoards>, rep: FastifyReply): Promise<void> => {
  try {
    const boards = await getConnection('myConn').getRepository(Board).createQueryBuilder('board').getMany();

    rep.send(boards);
  } catch (error) {
    rep.code(500).send(error);
  }
};

// GET /boards/:boardId - get the board by id
const getBoard = async (req: FastifyRequest<IreqBoards>, rep: FastifyReply): Promise<void> => {
  const { id } = req.params;

  try {
    const boardToSend = await getConnection('myConn')
      .getRepository(Board)
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOneOrFail();

    rep.send(boardToSend);
  } catch (error) {
    rep.code(404).send({ message: `Board with id ${id} not found.` });
  }
};

// POST /boards - create board
const addBoard = async (req: FastifyRequest<IreqBoards>, rep: FastifyReply): Promise<void> => {
  const boardProps = req.body;

  const board = {
    id: uuidv4(),
    ...boardProps,
  };

  await getConnection('myConn').createQueryBuilder().insert().into(Board).values(board).execute();
  rep.code(201).send(board);
};

// PUT /boards/:boardId - update board
const updateBoard = async (req: FastifyRequest<IreqBoards>, rep: FastifyReply): Promise<void> => {
  const boardProps = req.body;
  const { id } = req.params;

  try {
    const board = await getConnection('myConn')
      .getRepository(Board)
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOneOrFail();

    await getConnection('myConn')
      .createQueryBuilder()
      .update(Board)
      .set({ id, ...boardProps })
      .where('id = :id', { id })
      .execute();

    rep.code(200).send({ ...boardProps });
  } catch (error) {
    rep.code(404).send({ message: `Board with id ${id} not found.` });
  }
};

// DELETE /boards/:boardId - delete board Tasks should be deleted as well.
const deleteBoard = async (req: FastifyRequest<IreqBoards>, rep: FastifyReply): Promise<void> => {
  const { id } = req.params;

  try {
    const board = await getConnection('myConn')
      .getRepository(Board)
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOneOrFail();

    await getConnection('myConn').createQueryBuilder().delete().from(Board).where('id = :id', { id }).execute();

    await getConnection('myConn').createQueryBuilder().delete().from(Task).where('boardId = :id', { id }).execute();

    rep.code(204);
  } catch (error) {
    rep.code(404).send({ message: `Board with id ${id} not found.` });
  }
};

export { getBoard, getBoards, addBoard, updateBoard, deleteBoard };
