import { IsArray, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeTournaments } from 'src/common/enum/type.tournaments';

export class CreateTournamentDto {
  @ApiProperty({
    description: 'The name of the tournament',
    example: 'Torneo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the tournament',
    example: 'Este es un torneode ejemplo.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'An array of player IDs participating in the tournament',
    example: [1, 2, 3], // Ejemplo de IDs de jugadores
  })
  @IsArray()
  playerTournament: number[];

  @ApiProperty({
    description: 'The type of the tournament',
    example: TypeTournaments.League, // Ejemplo de tipo de torneo
  })
  @IsEnum(TypeTournaments)
  type: TypeTournaments;
}
