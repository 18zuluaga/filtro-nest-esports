import { IsDate, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  winnerId: number;

  @IsNumber()
  loserId: number;

  @IsNumber()
  tournamentId: number;

  @IsDate()
  date: Date;
}
