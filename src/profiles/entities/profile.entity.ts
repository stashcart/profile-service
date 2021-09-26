import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  phone!: string | null;
}
