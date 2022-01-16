import typeorm from 'typeorm';

const { Entity, Column, BaseEntity } = typeorm;

@Entity()
export default class User extends BaseEntity {
  // @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  pasword!: string;
}
