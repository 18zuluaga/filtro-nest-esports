import { PartialType } from '@nestjs/swagger';
import { CreatePlayerTournamentDto } from './create-player-tournament.dto';
import { IsNumber } from 'class-validator';

export class UpdatePlayerTournamentDto extends PartialType(
  CreatePlayerTournamentDto,
) {
  @IsNumber()
  points: number;
}
