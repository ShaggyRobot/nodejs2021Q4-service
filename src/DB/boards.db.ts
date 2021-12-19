interface IColumn {
  id?: string;
  title: string;
  order: number;
}

interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}

let boards: IBoard[] = [];

function putBoardsDb(newBoards: IBoard[]): void {
  boards = newBoards;
}

function getBoardsDb(): IBoard[] {
  return boards;
}

export { getBoardsDb, putBoardsDb, IBoard };

// const Column = {
//   type: 'object',
//   properties: {
//     id: { type: 'string', format: 'uuid' },
//     title: { type: 'string' },
//     order: { type: 'number' },
//   },
// };

// const Board = {
//   type: 'object',
//   properties: {
//     id: { type: 'string', format: 'uuid' },
//     title: { type: 'string' },
//     columns: {
//       type: 'array',
//       column: Column,
//     },
//   },
// };
