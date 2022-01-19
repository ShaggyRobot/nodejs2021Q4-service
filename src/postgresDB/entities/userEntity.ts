import typeorm from 'typeorm';
import uuid from 'uuid';

const { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn } = typeorm;

@Entity()
export default class User extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // dbidx!: number;

  @PrimaryColumn({ unique: true })
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
