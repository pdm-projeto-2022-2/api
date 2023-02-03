import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { DoacaoService } from '../sevice/doacao.service'
  import { Doacao as DoacaoModel} from '@prisma/client';
  
  @Controller()
  export class DoacaoController {
    constructor(
      private readonly doacaoService: DoacaoService
    ) {}
  
    @Get('doacoes')
    async getDoacaos(@Param('id') id: string): Promise<DoacaoModel[]> {
      return this.doacaoService.doacaos({})
    }

    @Get('doacoes/:id')
    async getDoacaoById(@Param('id') id: string): Promise<DoacaoModel> {
      return this.doacaoService.doacaos({where:{id: Number(id)}}) as any //FIXME
    }
  
  
    @Post('doacoes')
    async createDoacao(@Body() postData: {data: Date; doadorId: number; realizada: boolean;}): Promise<DoacaoModel> {
      const {data, doadorId, realizada} = postData;
      return this.doacaoService.createDoacao(postData);
    }
    
    @Put('doacoes/:id')
    async updateDoacao(@Param('id') id: string, @Body() postData: {data: Date; doadorId: number; realizada: boolean;}): Promise<DoacaoModel> {
      const {data, doadorId, realizada} = postData;
      return this.doacaoService.updateDoacao({where:{id: Number(id)}, data: postData});
    }
  
    @Delete('doacoes/:id')
    async deleteDoacao(@Param('id') id: string): Promise<DoacaoModel> {
      return this.doacaoService.deleteDoacao({ id: Number(id) });
    }
  }