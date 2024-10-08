import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { PlayerTournament } from 'src/player-tournaments/entities/player-tournament.entity';
import { Result } from './entities/result.entity';
import { Player } from 'src/players/entities/player.entity';
import { PlayersModule } from 'src/players/players.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersService } from 'src/players/players.service';
import { TournamentsService } from 'src/tournaments/tournaments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, PlayerTournament, Result, Player]),
    PlayersModule,
    TournamentsModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService, PlayersService, TournamentsService],
})
export class ResultsModule {}
