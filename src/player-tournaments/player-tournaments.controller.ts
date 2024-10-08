import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayerTournamentsService } from './player-tournaments.service';
import { CreatePlayerTournamentDto } from './dto/create-player-tournament.dto';
import { UpdatePlayerTournamentDto } from './dto/update-player-tournament.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationsPlayerTournaments } from './dto/paginations-player-tournaments';

@ApiTags('Player Tournaments')
@Controller('player-tournaments')
export class PlayerTournamentsController {
  constructor(
    private readonly playerTournamentsService: PlayerTournamentsService,
  ) {}

  @ApiOperation({ summary: 'Add a new player to a tournament' })
  @ApiBody({
    type: CreatePlayerTournamentDto,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Players have been added to the tournament',
    type: [CreatePlayerTournamentDto],
    example: [
      { playerId: 1, tournamentId: 1 },
      { playerId: 2, tournamentId: 1 },
    ],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: playerId must be a number',
      error: 'Bad Request',
    },
  })
  @Post()
  create(@Body() createPlayerTournamentDto: CreatePlayerTournamentDto[]) {
    return this.playerTournamentsService.create(createPlayerTournamentDto);
  }

  @ApiOperation({ summary: 'Get all player tournaments' })
  @ApiResponse({
    status: 200,
    description: 'List of player tournaments',
    type: [CreatePlayerTournamentDto],
    example: [
      { playerId: 1, tournamentId: 1 },
      { playerId: 2, tournamentId: 1 },
    ],
  })
  @Get()
  findAll() {
    return this.playerTournamentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a player tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player tournament found',
    type: CreatePlayerTournamentDto,
    example: { playerId: 1, tournamentId: 1 },
  })
  @ApiResponse({
    status: 404,
    description: 'Player tournament not found',
    example: {
      statusCode: 404,
      message: 'Player tournament not found',
      error: 'Not Found',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerTournamentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get player tournaments by tournament ID' })
  @ApiResponse({
    status: 200,
    description: 'List of player tournaments',
    type: [CreatePlayerTournamentDto],
    example: [{ playerId: 1 }, { playerId: 2 }],
  })
  @ApiResponse({
    status: 404,
    description: 'Player tournament not found',
    example: {
      statusCode: 404,
      message: 'Player tournament not found',
      error: 'Not Found',
    },
  })
  @Get('tournament/:id')
  findByTournamentId(@Param('id') id: string) {
    return this.playerTournamentsService.findByTournamentId(+id);
  }

  @ApiOperation({ summary: 'Get a player tournament with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of player tournaments',
    example: {
      data: [
        { playerId: 1, tournamentId: 1, points: 0 },
        { playerId: 2, tournamentId: 1, points: 0 },
      ],
      total: 50,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Player tournament not found',
    example: {
      statusCode: 404,
      message: 'Player tournament not found',
      error: 'Not Found',
    },
  })
  @ApiBody({ type: PaginationsPlayerTournaments })
  @Post('pagination')
  paginationFindAll(@Body() { limit, page }: PaginationsPlayerTournaments) {
    return this.playerTournamentsService.paginationFindAll(+limit, +page);
  }

  @ApiOperation({ summary: 'Update a player tournament by ID' })
  @ApiBody({ type: UpdatePlayerTournamentDto })
  @ApiResponse({
    status: 200,
    description: 'The player tournament has been updated',
    type: CreatePlayerTournamentDto,
    example: { playerId: 1, tournamentId: 2 }, // Suponiendo que se actualiza el torneo
  })
  @ApiResponse({
    status: 404,
    description: 'Player tournament not found',
    example: {
      statusCode: 404,
      message: 'Player tournament not found',
      error: 'Not Found',
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerTournamentDto: UpdatePlayerTournamentDto,
  ) {
    return this.playerTournamentsService.update(+id, updatePlayerTournamentDto);
  }

  @ApiOperation({ summary: 'Delete a player tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player tournament has been deleted',
    example: {
      message: 'Player tournament deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Player tournament not found',
    example: {
      statusCode: 404,
      message: 'Player tournament not found',
      error: 'Not Found',
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerTournamentsService.remove(+id);
  }
}
