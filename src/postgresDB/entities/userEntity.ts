import typeorm from 'typeorm';

const { Entity, Column, BaseEntity, PrimaryColumn } = typeorm;
@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn({ unique: true })
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
