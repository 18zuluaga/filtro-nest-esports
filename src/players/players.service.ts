import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      const player = { ...createPlayerDto, isDeleted: false };
      return await this.playerRepository.save(player);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.playerRepository.find({
        where: { isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.playerRepository.findOne({
        where: { id, isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.playerRepository.findOne({
        where: { email, isDeleted: false },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      return await this.playerRepository.update(id, updatePlayerDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.playerRepository.update(id, { isDeleted: true });
    } catch (error) {
      throw error;
    }
  }
}
