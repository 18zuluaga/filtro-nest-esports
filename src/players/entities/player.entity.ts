import { Role } from 'src/common/enum/role.enum';
import { PlayerTournament } from 'src/player-tournaments/entities/player-tournament.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(
    () => PlayerTournament,
    (playerTournament) => playerTournament.player,
  )
  playerTournament: PlayerTournament[];

  @Column()
  isDeleted: boolean;
}
