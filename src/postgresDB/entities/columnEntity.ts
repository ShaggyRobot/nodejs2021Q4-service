import typeorm from 'typeorm';
import IBoard from '../interfaces/board.interface.js';
import { IColumn } from '../interfaces/column.interface.js';

const { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } = typeorm;

@Entity()
export default class BoardColumn extends BaseEntity implements IColumn {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne('Board', 'columns')
  board!: IBoard;
}
