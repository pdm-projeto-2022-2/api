import { Test, TestingModule } from '@nestjs/testing';
import {  ExecptionsPostgreeService } from './postgree.service';

describe('PostgreeService', () => {
  let service:  ExecptionsPostgreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ ExecptionsPostgreeService],
    }).compile();

    service = module.get< ExecptionsPostgreeService>(ExecptionsPostgreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
