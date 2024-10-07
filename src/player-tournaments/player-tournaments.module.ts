import { Module } from '@nestjs/common';
import { PlayerTournamentsService } from './player-tournaments.service';
import { PlayerTournamentsController } from './player-tournaments.controller';

@Module({
  controllers: [PlayerTournamentsController],
  providers: [PlayerTournamentsService],
})
export class PlayerTournamentsModule {}
