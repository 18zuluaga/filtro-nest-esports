import { IsArray, IsEnum, IsString } from 'class-validator';
import { TypeTournaments } from 'src/common/enum/type.tournaments';

export class CreateTournamentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  playerTournament: number[];

  @IsEnum(TypeTournaments)
  type: TypeTournaments;
}
