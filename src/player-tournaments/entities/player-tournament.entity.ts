import { Tournament } from './../../tournaments/entities/tournament.entity';
import { Player } from './../../players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from 'src/results/entities/result.entity';

@Entity()
export class PlayerTournament {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerTournament)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.playersTournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column()
  points: number;

  @OneToMany(() => Result, (result) => result.loser)
  resultLost: Result[];

  @OneToMany(() => Result, (result) => result.loser)
  resulWinner: Result[];

  @Column()
  isDeleted: boolean;
}
