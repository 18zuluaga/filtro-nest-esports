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

@Controller('player-tournaments')
export class PlayerTournamentsController {
  constructor(
    private readonly playerTournamentsService: PlayerTournamentsService,
  ) {}

  @Post()
  create(@Body() createPlayerTournamentDto: CreatePlayerTournamentDto[]) {
    return this.playerTournamentsService.create(createPlayerTournamentDto);
  }

  @Get()
  findAll() {
    return this.playerTournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerTournamentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerTournamentDto: UpdatePlayerTournamentDto,
  ) {
    return this.playerTournamentsService.update(+id, updatePlayerTournamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerTournamentsService.remove(+id);
  }
}
