import typeorm, { Unique } from 'typeorm';
import uuid from 'uuid';

const { Entity, Column, BaseEntity, PrimaryGeneratedColumn } = typeorm;

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  dbidx!: number;

  @Column({ unique: true })
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
