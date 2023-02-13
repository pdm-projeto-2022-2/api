import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseExeptions } from 'dist/database/database-execeptions/IDatabaseExceptions';
import { PostgreeService } from 'src/module/database/postgree/postgree.service';


@Injectable()
export class BuscarTipoSanguineoService {
  constructor(
    private readonly database: PostgreeService,
    @Inject('EXCEPTIONS_POSTGREE')
    private readonly execeptions: IDatabaseExeptions
  ){}

  async findAllByBloodType(tipo_sanguineo :tipo_sanguineo) {
    try {
      return await this.database.usuario.findMany({
        where:{
          tipoSangue: tipo_sanguineo
        }
      })
    } catch (error) {
      this.execeptions.checkError(error)
    }
  }
}
