import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuscarTipoSanguineoService } from './buscar-tipo-sanguineo.service';
import { BuscarTipoSanguineoDto } from './dto/create-buscar-tipo-sanguineo.dto';


@Controller('buscar-tipo-sanguineo')
export class BuscarTipoSanguineoController {
  constructor(private readonly buscarTipoSanguineoService: BuscarTipoSanguineoService) {}

  @Get()
  findAllByBloodType(dto :BuscarTipoSanguineoDto){
    return this.buscarTipoSanguineoService.findAllByBloodType(dto.tipo_sanguineo)
  }
}
