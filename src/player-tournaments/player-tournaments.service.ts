import { Injectable } from '@nestjs/common';
import { CreatePlayerTournamentDto } from './dto/create-player-tournament.dto';
import { UpdatePlayerTournamentDto } from './dto/update-player-tournament.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerTournament } from './entities/player-tournament.entity';
import { PlayersService } from 'src/players/players.service';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Injectable()
export class PlayerTournamentsService {
  constructor(
    @InjectRepository(PlayerTournament)
    private readonly playerTournamentRepository: Repository<PlayerTournament>,
    @InjectRepository(Tournament)
    private readonly TournamentRepository: Repository<Tournament>,

    private readonly playersService: PlayersService,
  ) {}

  async create(createPlayerTournamentDto: CreatePlayerTournamentDto[]) {
    try {
      const players = createPlayerTournamentDto.map(
        async (createPlayerTournamentDto) => {
          const player = await this.playersService.findOne(
            createPlayerTournamentDto.playerId,
          );
          const tournament = await this.TournamentRepository.findOne({
            where: {
              id: createPlayerTournamentDto.tournamentId,
              isDeleted: false,
            },
          });
          if (!player) {
            throw new Error('Player or tournament not found');
          }
          const playerTournament = {
            player,
            tournament,
            points: 0,
            isDeleted: false,
          };
          const playerTournamentCreated =
            await this.playerTournamentRepository.save(playerTournament);
          return playerTournamentCreated;
        },
      );
      return players;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.playerTournamentRepository.find({
        where: { isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.playerTournamentRepository.findOne({
        where: { id, isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updatePlayerTournamentDto: UpdatePlayerTournamentDto,
  ) {
    try {
      return await this.playerTournamentRepository.update(id, {
        points: updatePlayerTournamentDto.points,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.playerTournamentRepository.update(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
