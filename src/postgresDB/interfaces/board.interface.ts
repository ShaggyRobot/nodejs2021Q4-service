import { IColumn } from './column.interface.js';

export default interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
