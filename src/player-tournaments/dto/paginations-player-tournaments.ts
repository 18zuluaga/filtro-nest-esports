import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationsPlayerTournaments {
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  @IsNumber()
  limit: number;
}
