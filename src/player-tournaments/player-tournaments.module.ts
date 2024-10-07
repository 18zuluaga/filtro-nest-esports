import { Module } from '@nestjs/common';
import { PlayerTournamentsService } from './player-tournaments.service';
import { PlayerTournamentsController } from './player-tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { PlayerTournament } from './entities/player-tournament.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { PlayersModule } from 'src/players/players.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { PlayersService } from 'src/players/players.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, PlayerTournament, Tournament]),
    PlayersModule,
    TournamentsModule,
  ],
  controllers: [PlayerTournamentsController],
  providers: [PlayerTournamentsService, PlayersService, TournamentsService],
})
export class PlayerTournamentsModule {}
