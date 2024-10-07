import { IsNumber } from 'class-validator';

export class CreatePlayerTournamentDto {
  @IsNumber()
  playerId: number;

  @IsNumber()
  tournamentId: number;
}
