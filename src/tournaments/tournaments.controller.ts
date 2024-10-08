import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeTournaments } from 'src/common/enum/type.tournaments';
import { Tournament } from './entities/tournament.entity';
import {
  PrivateService,
  Role,
} from 'src/common/decorators/permision.decorators';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @ApiOperation({ summary: 'Add a new tournament' })
  @ApiBody({
    type: CreateTournamentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The tournament was created',
    type: Tournament,
    example: {
      id: 1,
      name: 'Torneo 1',
      description: 'Este es un torneo de ejemplo',
      dates: ['jornada 1 2024-10-05 jugador 1 - jugador 2'],
      result: [],
      playersTournament: [
        { playerId: 1, tournamentId: 1 },
        { playerId: 2, tournamentId: 1 },
      ],
      type: TypeTournaments.League,
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: name must be a string',
      error: 'Bad Request',
    },
  })
  @PrivateService()
  @Role(['admin'])
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({
    status: 200,
    description: 'List of tournaments',
    type: [Tournament],
    example: [
      {
        id: 1,
        name: 'Torneo 1',
        description: 'Este es un torneo de ejemplo',
        dates: ['jornada 1 2024-10-05 jugador 1 - jugador 2'],
        result: [],
        playersTournament: [
          { playerId: 1, tournamentId: 1 },
          { playerId: 2, tournamentId: 1 },
        ],
        type: TypeTournaments.League,
        isDeleted: false,
      },
    ],
  })
  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The tournament found',
    type: Tournament,
    example: {
      id: 1,
      name: 'Torneo 1',
      description: 'Este es un torneo de ejemplo',
      dates: ['jornada 1 2024-10-05 jugador 1 - jugador 2'],
      result: [],
      playersTournament: [
        { playerId: 1, tournamentId: 1 },
        { playerId: 2, tournamentId: 1 },
      ],
      type: TypeTournaments.League,
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tournament not found',
    example: {
      statusCode: 404,
      message: 'Tournament not found',
      error: 'Not Found',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get ranking of a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The tournament ranking found',
    type: [Tournament],
    example: [
      {
        id: 1,
        name: 'Torneo 1',
        description: 'Este es un torneo de ejemplo',
        dates: ['jornada 1 2024-10-05 jugador 1 - jugador 2'],
        result: [],
        playersTournament: [
          { playerId: 1, tournamentId: 1 },
          { playerId: 2, tournamentId: 1 },
        ],
        type: TypeTournaments.League,
        isDeleted: false,
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Tournament not found',
    example: {
      statusCode: 404,
      message: 'Tournament not found',
      error: 'Not Found',
    },
  })
  @Get('/ranking/:id')
  findRanking(@Param('id') id: string) {
    console.log(id);
    return this.tournamentsService.ranking(+id);
  }

  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiResponse({
    status: 200,
    description: 'The tournament has been updated',
    type: Tournament,
    example: {
      id: 1,
      name: 'Torneo actualizado',
      description: 'Este es un torneo actualizado',
      dates: ['jornada 1 2024-10-05 jugador 1 - jugador 2'],
      result: [],
      playersTournament: [
        { playerId: 1, tournamentId: 1 },
        { playerId: 2, tournamentId: 1 },
      ],
      type: TypeTournaments.League,
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: description must be a string',
      error: 'Bad Request',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tournament not found',
    example: {
      statusCode: 404,
      message: 'Tournament not found',
      error: 'Not Found',
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The tournament has been deleted',
    example: {
      message: 'Tournament deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tournament not found',
    example: {
      statusCode: 404,
      message: 'Tournament not found',
      error: 'Not Found',
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }
}
