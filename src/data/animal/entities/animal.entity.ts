import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Animal')
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  farmTag: string;
  @Column()
  isFeeding?: boolean;
  @Column()
  birthDate: Date;
  @Column()
  lastBirthOne?: Date | null;
  @Column()
  birthCount: number;
  @Column({ nullable: false })
  name?: string;
}
