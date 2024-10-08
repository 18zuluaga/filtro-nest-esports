import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Player } from './entities/player.entity';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Add a new player' })
  @ApiBody({
    type: CreatePlayerDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The player was created',
    type: Player,
    example: {
      id: 1,
      name: 'Juan Pérez',
      age: 25,
      position: 'Delantero',
      teamId: 1,
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
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({
    status: 200,
    description: 'List of players',
    type: [Player],
    example: [
      {
        id: 1,
        name: 'Juan Pérez',
        age: 25,
        position: 'Delantero',
        teamId: 1,
        isDeleted: false,
      },
    ],
  })
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @ApiOperation({ summary: 'Get a player by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player found',
    type: Player,
    example: {
      id: 1,
      name: 'Juan Pérez',
      age: 25,
      position: 'Delantero',
      teamId: 1,
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Player not found',
    example: {
      statusCode: 404,
      message: 'Player not found',
      error: 'Not Found',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a player by ID' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({
    status: 200,
    description: 'The player has been updated',
    type: Player,
    example: {
      id: 1,
      name: 'Juan Pérez',
      age: 26, // Suponiendo que se actualiza la edad
      position: 'Delantero',
      teamId: 1,
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    example: {
      statusCode: 400,
      message: 'Validation error: age must be a number',
      error: 'Bad Request',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Player not found',
    example: {
      statusCode: 404,
      message: 'Player not found',
      error: 'Not Found',
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @ApiOperation({ summary: 'Delete a player by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player has been deleted',
    example: {
      message: 'Player deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Player not found',
    example: {
      statusCode: 404,
      message: 'Player not found',
      error: 'Not Found',
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
