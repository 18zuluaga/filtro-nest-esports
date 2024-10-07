import { Test, TestingModule } from '@nestjs/testing';
import { PlayerTournamentsController } from './player-tournaments.controller';
import { PlayerTournamentsService } from './player-tournaments.service';

describe('PlayerTournamentsController', () => {
  let controller: PlayerTournamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerTournamentsController],
      providers: [PlayerTournamentsService],
    }).compile();

    controller = module.get<PlayerTournamentsController>(PlayerTournamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
