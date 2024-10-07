import { TypeTournaments } from 'src/common/enum/type.tournaments';
import { PlayerTournament } from 'src/player-tournaments/entities/player-tournament.entity';
import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json')
  dates: string[];

  @OneToMany(
    () => PlayerTournament,
    (playerTournament) => playerTournament.tournament,
  )
  playerTournament: PlayerTournament[];

  @OneToMany(() => Result, (result) => result.tournament)
  result: Result[];

  @Column()
  type: TypeTournaments;

  @Column()
  isDeleted: boolean;
}
