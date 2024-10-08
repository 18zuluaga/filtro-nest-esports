import { Player } from './../players/entities/player.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from 'src/players/players.service';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly PlayersService: PlayersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: Partial<Player>) {
    try {
      const userDB = await this.PlayersService.findOneByEmail(user.email);
      if (userDB && (await bcrypt.compare(user.password, userDB.password))) {
        const payload = { email: userDB.email, id: userDB.id, role: 'admin' };
        const token = this.jwtService.sign(payload);
        return { token };
      }
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log(error);
    }
  }

  async register(player: CreatePlayerDto) {
    try {
      const PlayerDB = await this.PlayersService.findOneByEmail(player.email);
      if (PlayerDB) {
        throw new HttpException('Player already exists', HttpStatus.CONFLICT);
      }
      const hashedPassword = await bcrypt.hash(player.password, 10);
      const newplayer = await this.PlayersService.create({
        ...player,
        password: hashedPassword,
      });
      const payload = {
        email: newplayer.email,
        id: newplayer.id,
        role: newplayer.role,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
