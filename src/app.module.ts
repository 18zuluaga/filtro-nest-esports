import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { ResultsModule } from './results/results.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTournamentsModule } from './player-tournaments/player-tournaments.module';
import { PlayerTournament } from './player-tournaments/entities/player-tournament.entity';
import { configDotenv } from 'dotenv';
import { Player } from './players/entities/player.entity';
import { Result } from './results/entities/result.entity';
import { Tournament } from './tournaments/entities/tournament.entity';

configDotenv();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [PlayerTournament, Player, Tournament, Result],
      synchronize: true,
    }),
    TournamentsModule,
    PlayersModule,
    ResultsModule,
    PlayerTournamentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
