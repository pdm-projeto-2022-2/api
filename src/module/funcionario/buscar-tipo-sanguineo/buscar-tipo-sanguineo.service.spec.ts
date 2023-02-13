import { Test, TestingModule } from '@nestjs/testing';
import { BuscarTipoSanguineoService } from './buscar-tipo-sanguineo.service';

describe('BuscarTipoSanguineoService', () => {
  let service: BuscarTipoSanguineoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuscarTipoSanguineoService],
    }).compile();

    service = module.get<BuscarTipoSanguineoService>(BuscarTipoSanguineoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
