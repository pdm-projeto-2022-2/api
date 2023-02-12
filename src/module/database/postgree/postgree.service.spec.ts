import { Test, TestingModule } from '@nestjs/testing';
import { PostgreeService } from './postgree.service';

describe('PostgreeService', () => {
  let service: PostgreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgreeService],
    }).compile();

    service = module.get<PostgreeService>(PostgreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
