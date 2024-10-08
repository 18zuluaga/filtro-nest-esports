import { TournamentsService } from 'src/tournaments/tournaments.service';
import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly playerService: PlayersService,
    private readonly TournamentsService: TournamentsService,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const winer = await this.playerService.findOne(createResultDto.winnerId);
    const loser = await this.playerService.findOne(createResultDto.loserId);
    const tournament = await this.TournamentsService.findOne(
      createResultDto.tournamentId,
    );

    if (!winer || !loser || !tournament) {
      throw new Error('Players or tournament not found');
    }
    return await this.resultRepository.save({
      winer,
      loser,
      tournament,
      date: createResultDto.date,
      isDeleted: false,
    });
  }

  async findAll() {
    try {
      return await this.resultRepository.find({
        where: { isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.resultRepository.findOne({
        where: { id, isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    try {
      return await this.resultRepository.update(id, updateResultDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.resultRepository.update(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
