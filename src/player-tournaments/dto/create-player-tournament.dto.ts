import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerTournamentDto {
  @ApiProperty({
    description: 'The ID of the player',
    example: 1,
  })
  @IsNumber()
  playerId: number;

  @ApiProperty({
    description: 'The ID of the tournament',
    example: 1,
  })
  @IsNumber()
  tournamentId: number;
}

export class UpdatePlayerTournamentDto {
  @ApiProperty({
    description: 'The ID of the player',
    example: 1,
    required: false,
  })
  @IsNumber()
  playerId?: number;

  @ApiProperty({
    description: 'The ID of the tournament',
    example: 1,
    required: false,
  })
  @IsNumber()
  tournamentId?: number;
}
