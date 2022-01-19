import typeorm from 'typeorm';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';

const { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, BaseEntity } = typeorm;

@Entity()
export default class Task extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // dbidx!: number;

  @PrimaryColumn()
  // @Column({ unique: true })
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  order!: number;

  @Column()
  description!: string;

  @Column()
  boardId!: string;

  @Column({ type: 'text', nullable: true })
  userId!: string | null;

  @Column({ nullable: true })
  columnId!: string;
}
