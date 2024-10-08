import { Module } from '@nestjs/common';
import { PlayerTournamentsService } from './player-tournaments.service';
import { PlayerTournamentsController } from './player-tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { PlayerTournament } from './entities/player-tournament.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { PlayersModule } from 'src/players/players.module';
import { PlayersService } from 'src/players/players.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, PlayerTournament, Tournament]),
    PlayersModule,
  ],
  controllers: [PlayerTournamentsController],
  providers: [PlayerTournamentsService, PlayersService],
})
export class PlayerTournamentsModule {}
