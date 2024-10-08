import { IsNumber } from 'class-validator';

export class UpdatePlayerTournamentDto {
  @IsNumber()
  points: number;
}
