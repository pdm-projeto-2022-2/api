import { Module } from '@nestjs/common';
import { BuscarTipoSanguineoService } from './buscar-tipo-sanguineo.service';
import { BuscarTipoSanguineoController } from './buscar-tipo-sanguineo.controller';

@Module({
  controllers: [BuscarTipoSanguineoController],
  providers: [BuscarTipoSanguineoService]
})
export class BuscarTipoSanguineoModule {}
