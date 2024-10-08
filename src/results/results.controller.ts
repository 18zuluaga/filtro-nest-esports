import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from './entities/result.entity';
import { ApiKeyGuard } from 'src/common/guard/api-key.guard';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiOperation({
    summary:
      'Add a new result but for this enpoint that needs to be authenticated',
    description:
      'you can Add a new result but for this enpoint that needs to be authenticated',
  })
  @ApiBody({
    type: CreateResultDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The result was created',
    type: Result,
    example: {
      id: 1,
      winner: { playerId: 1 }, // Supongamos que hay una estructura para el jugador
      loser: { playerId: 2 },
      tournament: { id: 1, name: 'Torneo de Fútbol' }, // Ejemplo simplificado
      date: '2024-10-05T00:00:00.000Z',
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: winnerId must be a number',
      error: 'Bad Request',
    },
  })
  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @ApiOperation({ summary: 'Get all results' })
  @ApiResponse({
    status: 200,
    description: 'List of results',
    type: [Result],
    example: [
      {
        id: 1,
        winner: { playerId: 1, tournamentId: 1 },
        loser: { playerId: 2, tournamentId: 1 },
        tournament: { id: 1, name: 'Torneo de Fútbol' },
        date: '2024-10-05T00:00:00.000Z',
        isDeleted: false,
      },
    ],
  })
  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @ApiOperation({ summary: 'Get a result by ID' })
  @ApiResponse({
    status: 200,
    description: 'The result found',
    type: Result,
    example: {
      id: 1,
      winner: { playerId: 1, tournamentId: 1 },
      loser: { playerId: 2, tournamentId: 1 },
      tournament: { id: 1, name: 'Torneo de Fútbol' },
      date: '2024-10-05T00:00:00.000Z',
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Result not found',
    example: {
      statusCode: 404,
      message: 'Result not found',
      error: 'Not Found',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a result by ID' })
  @ApiBody({ type: UpdateResultDto })
  @ApiResponse({
    status: 200,
    description: 'The result has been updated',
    type: Result,
    example: {
      id: 1,
      winner: { playerId: 1, tournamentId: 1 },
      loser: { playerId: 2, tournamentId: 1 },
      tournament: { id: 1, name: 'Torneo de Fútbol' },
      date: '2024-10-05T00:00:00.000Z',
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: date must be a date',
      error: 'Bad Request',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Result not found',
    example: {
      statusCode: 404,
      message: 'Result not found',
      error: 'Not Found',
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(+id, updateResultDto);
  }

  @ApiOperation({ summary: 'Delete a result by ID' })
  @ApiResponse({
    status: 200,
    description: 'The result has been deleted',
    example: {
      message: 'Result deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Result not found',
    example: {
      statusCode: 404,
      message: 'Result not found',
      error: 'Not Found',
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
