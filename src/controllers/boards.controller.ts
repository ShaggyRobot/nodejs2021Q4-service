import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';

import { getBoardsDb, putBoardsDb, IBoard } from '../DB/boards.db.js';
import { getTasksDb, putTasksDb } from '../DB/tasks.db.js';

interface IreqBoards extends RequestGenericInterface {
  Params: { id: string };
  Body: IBoard;
}

// GET /boards - get all boards
const getBoards = (req: FastifyRequest<IreqBoards>, rep: FastifyReply): void => {
  const boards = getBoardsDb();
  rep.send(boards);
};

// GET /boards/:boardId - get the board by id
const getBoard = (req: FastifyRequest<IreqBoards>, rep: FastifyReply): void => {
  const boards = getBoardsDb();
  const { id } = req.params;

  const boardToSend = boards.find(board => board.id === id);

  if (boardToSend) {
    rep.send(boardToSend);
  } else {
    rep.code(404).send({ message: `Board ${id} not found.` });
  }
};

// POST /boards - create board
const addBoard = (req: FastifyRequest<IreqBoards>, rep: FastifyReply): void => {
  let boards = getBoardsDb();
  const boardProps = req.body;

  const board = {
    id: uuidv4(),
    ...boardProps,
  };

  boards = [...boards, board];
  putBoardsDb(boards);

  rep.code(201).send(board);
};

// PUT /boards/:boardId - update board
const updateBoard = (req: FastifyRequest<IreqBoards>, rep: FastifyReply): void => {
  let boards = getBoardsDb();
  const boardProps = req.body;
  const { id } = req.params;

  boards = boards.map(board => (board.id === id ? { id, ...boardProps } : board));
  const board = boards.find(brd => brd.id === id);

  putBoardsDb(boards);
  rep.send(board);
};

// DELETE /boards/:boardId - delete board Tasks should be deleted as well.
const deleteBoard = (req: FastifyRequest<IreqBoards>, rep: FastifyReply): void => {
  let boards = getBoardsDb();
  let tasks = getTasksDb();
  const { id } = req.params;

  boards = boards.filter(brd => brd.id !== id);
  tasks = tasks.filter(tsk => tsk.boardId !== id);

  putBoardsDb(boards);
  putTasksDb(tasks);

  rep.send({ message: `Board ${id} has been removed.` });
};

export { getBoard, getBoards, addBoard, updateBoard, deleteBoard };
