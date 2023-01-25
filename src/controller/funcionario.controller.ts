import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { FuncionarioService } from '../sevice/funcionario.service'
  import { Funcionario as FuncionarioModel} from '@prisma/client';
  
  @Controller()
  export class FuncionarioController {
    constructor(
      private readonly funcionarioService: FuncionarioService
    ) {}
  
    @Get('funcionario')
    async getFuncionarios(@Param('id') id: string): Promise<FuncionarioModel[]> {
      return this.funcionarioService.funcionarios({})
    }

    @Get('funcionario/:id')
    async getFuncionarioById(@Param('id') id: string): Promise<FuncionarioModel> {
      return this.funcionarioService.funcionarios({where:{id: Number(id)}}) as any //FIXME
    }
  
  
    @Post('funcionario')
    async createDraft(
      @Body() postData: { nome: string; matricula: string; isAdmin: boolean; imagem: string },
    ): Promise<FuncionarioModel> {
      const { nome, matricula, isAdmin, imagem} = postData;
      return this.funcionarioService.createFuncionario({ nome, matricula, isAdmin, imagem});
    }
    
    @Put('funcionario/:id')
    async publishPost(@Param('id') id: string, @Body() postData: { nome: string; matricula: string; isAdmin: boolean; imagem: string }): Promise<FuncionarioModel> {
      const { nome, matricula, isAdmin, imagem} = postData
      return this.funcionarioService.updateFuncionario({where:{id: Number(id)}, data:{ nome, matricula, isAdmin, imagem}});
    }
  
    @Delete('funcionario/:id')
    async deletePost(@Param('id') id: string): Promise<FuncionarioModel> {
      return this.funcionarioService.deleteFuncionario({ id: Number(id) });
    }
  }