import typeorm from 'typeorm';
import { IColumn } from '../interfaces/column.interface.js';

const { Entity, PrimaryColumn, Column, BaseEntity } = typeorm;

@Entity()
export default class Board extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'json', array: false, nullable: true })
  columns!: Array<IColumn>;
}
