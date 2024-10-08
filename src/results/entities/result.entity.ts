import { PlayerTournament } from 'src/player-tournaments/entities/player-tournament.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PlayerTournament,
    (playerTournament) => playerTournament.resultLost,
  )
  @JoinColumn({ name: 'lost_player_id' })
  loser: PlayerTournament;

  @ManyToOne(
    () => PlayerTournament,
    (playerTournament) => playerTournament.resulWinner,
  )
  @JoinColumn({ name: 'winner_player_id' })
  winner: PlayerTournament;

  @ManyToOne(() => Tournament, (tournament) => tournament.playersTournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column()
  date: Date;
}
