const { v4: uuidv4 } = require('uuid');
let boards = require('../DB/boards.db');
const { getTasksDb, putTasksDb } = require('../DB/tasks.db');

const getBoards = (req, rep) => {
  rep.send(boards);
};

const getBoard = (req, rep) => {
  const { id } = req.params;
  const boardToSend = boards.find((board) => board.id === id);

  if (boardToSend) {
    rep.send(boardToSend);
  } else {
    rep.code(404).send({ message: `Board ${id} not found.` });
  }
};

const addBoard = (req, rep) => {
  const boardProps = req.body;

  const board = {
    id: uuidv4(),
    ...boardProps,
  };

  boards = [...boards, board];

  rep.code(201).send(board);
};

const updateBoard = (req, rep) => {
  const boardProps = req.body;
  const { id } = req.params;

  boards = boards.map((board) =>
    board.id === id ? { id, ...boardProps } : board
  );
  const board = boards.find((brd) => brd.id === id);

  rep.send(board);
};

const deleteBoard = (req, rep) => {
  let tasks = getTasksDb()
  const { id } = req.params;

  boards = boards.filter((brd) => brd.id !== id);
  tasks = tasks.filter((tsk) => tsk.boardId !== id)

  putTasksDb(tasks)
  
  rep.send({ message: `Board ${id} has been removed.` });
};

module.exports = {
  getBoard,
  getBoards,
  addBoard,
  updateBoard,
  deleteBoard,
};
