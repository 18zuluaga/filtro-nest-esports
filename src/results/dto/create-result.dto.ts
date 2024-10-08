import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty({
    description: 'The ID of the winning player',
    example: 1,
  })
  @IsNumber()
  winnerId: number;

  @ApiProperty({
    description: 'The ID of the losing player',
    example: 2,
  })
  @IsNumber()
  loserId: number;

  @ApiProperty({
    description: 'The ID of the tournament',
    example: 1,
  })
  @IsNumber()
  tournamentId: number;

  @ApiProperty({
    description: 'The date of the result',
    example: '2024-10-05T00:00:00.000Z',
  })
  @IsDateString()
  date: string;
}
