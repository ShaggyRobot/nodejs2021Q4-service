import typeorm from 'typeorm';

const { Entity, PrimaryColumn, Column, BaseEntity } = typeorm;

@Entity()
export default class Task extends BaseEntity {
  @PrimaryColumn()
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
