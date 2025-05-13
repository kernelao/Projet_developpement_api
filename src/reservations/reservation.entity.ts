import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  date: string;

@Column({ nullable: true })
heure: string;

  @Column()
  service: string;

  @Column({ nullable: true })
  message?: string; // 👈 ajouté

  @CreateDateColumn()
  createdAt: Date;
}