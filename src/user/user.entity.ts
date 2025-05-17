import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column({ nullable: true })
  entreprise?: string;

  @Column({ default: false }) // ✅ compte non vérifié par défaut
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true }) // ✅ token de vérification
  verificationToken: string | null;
}
