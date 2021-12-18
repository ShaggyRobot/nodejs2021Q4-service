let boards = [];

function putBoardsDb(newBoards) {
  boards = newBoards;
}

function getBoardsDb() {
  return boards;
}

module.exports = { getBoardsDb, putBoardsDb };
