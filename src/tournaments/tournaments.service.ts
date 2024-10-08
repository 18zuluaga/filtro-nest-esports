import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerTournamentsService } from 'src/player-tournaments/player-tournaments.service';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    private readonly playerTournamentsService: PlayerTournamentsService,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    try {
      const matches = [];
      const initialDate = new Date();
      const playedMatches = new Set();

      for (let i = 0; i < createTournamentDto.playerTournament.length; i++) {
        for (let j = 0; j < createTournamentDto.playerTournament.length; j++) {
          if (i !== j) {
            const matchKey = `${createTournamentDto.playerTournament[i]}-${createTournamentDto.playerTournament[j]}`;
            const reverseMatchKey = `${createTournamentDto.playerTournament[j]}-${createTournamentDto.playerTournament[i]}`;
            if (
              !playedMatches.has(matchKey) &&
              !playedMatches.has(reverseMatchKey)
            ) {
              const date = new Date(initialDate);
              date.setDate(date.getDate() + i);
              matches.push(
                `Jornada ${i + 1} fecha ${date.toLocaleDateString('es-ES')} jugador ${createTournamentDto.playerTournament[i]} vs jugador ${createTournamentDto.playerTournament[j]}`,
              );
              playedMatches.add(matchKey);
            }
          }
        }
      }

      const tournament = {
        ...createTournamentDto,
        isDeleted: false,
        dates: matches,
      };

      delete tournament.playerTournament;

      const Tournament = await this.tournamentRepository.save(tournament);
      const playersCreate = createTournamentDto.playerTournament.map(
        (playerId) => {
          return { playerId, tournamentId: Tournament.id };
        },
      );
      const playerscreate =
        await this.playerTournamentsService.create(playersCreate);

      return { Tournament, playerscreate };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.tournamentRepository.find({
        where: { isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.tournamentRepository.findOne({
        where: { id, isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async ranking(id: number) {
    try {
      const players =
        await this.playerTournamentsService.findByTournamentId(id);
      console.log(players);
      return players.sort((a, b) => b.points - a.points);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    try {
      return await this.tournamentRepository.update(id, updateTournamentDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.tournamentRepository.update(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
