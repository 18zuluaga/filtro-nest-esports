import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { PlayerTournament } from 'src/player-tournaments/entities/player-tournament.entity';
import { PlayerTournamentsModule } from 'src/player-tournaments/player-tournaments.module';
import { PlayerTournamentsService } from 'src/player-tournaments/player-tournaments.service';
import { PlayersModule } from 'src/players/players.module';
import { Player } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, PlayerTournament, Player]),
    PlayerTournamentsModule,
    PlayersModule,
  ],
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    PlayerTournamentsService,
    PlayersService,
    JwtService,
    ConfigService,
  ],
})
export class TournamentsModule {}
