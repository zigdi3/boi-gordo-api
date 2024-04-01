import { Entity, PrimaryGeneratedColumn, Column, Collection } from 'typeorm';

@Entity('Client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  refreshToken?: string;
}
