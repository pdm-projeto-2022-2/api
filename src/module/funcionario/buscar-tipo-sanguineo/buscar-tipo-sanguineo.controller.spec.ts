import { Test, TestingModule } from '@nestjs/testing';
import { BuscarTipoSanguineoController } from './buscar-tipo-sanguineo.controller';
import { BuscarTipoSanguineoService } from './buscar-tipo-sanguineo.service';

describe('BuscarTipoSanguineoController', () => {
  let controller: BuscarTipoSanguineoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuscarTipoSanguineoController],
      providers: [BuscarTipoSanguineoService],
    }).compile();

    controller = module.get<BuscarTipoSanguineoController>(BuscarTipoSanguineoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
