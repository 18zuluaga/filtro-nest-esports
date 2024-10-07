import { Test, TestingModule } from '@nestjs/testing';
import { PlayerTournamentsService } from './player-tournaments.service';

describe('PlayerTournamentsService', () => {
  let service: PlayerTournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerTournamentsService],
    }).compile();

    service = module.get<PlayerTournamentsService>(PlayerTournamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
