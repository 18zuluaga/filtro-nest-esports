import { Injectable } from '@nestjs/common';
import { CreatePlayerTournamentDto } from './dto/create-player-tournament.dto';
import { UpdatePlayerTournamentDto } from './dto/update-player-tournament.dto';

@Injectable()
export class PlayerTournamentsService {
  create(createPlayerTournamentDto: CreatePlayerTournamentDto) {
    return 'This action adds a new playerTournament';
  }

  findAll() {
    return `This action returns all playerTournaments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerTournament`;
  }

  update(id: number, updatePlayerTournamentDto: UpdatePlayerTournamentDto) {
    return `This action updates a #${id} playerTournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerTournament`;
  }
}
