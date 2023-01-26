import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UsuarioService } from '../sevice/usuario.service'
  import { Usuario as UsuarioModel} from '@prisma/client';
  
  @Controller()
  export class UsuarioController {
    constructor(
      private readonly usuarioService: UsuarioService
    ) {}
  
    @Get('usuarios')
    async getUsuarios(@Param('id') id: string): Promise<UsuarioModel[]> {
      return this.usuarioService.usuarios({})
    }

    @Get('usuarios/:id')
    async getUsuarioById(@Param('id') id: string): Promise<UsuarioModel> {
      return this.usuarioService.usuarios({where:{id: Number(id)}}) as any //FIXME
    }
  
  
    @Post('usuarios')
    async createUsuario(@Body() postData: {nome: string; tipoSangue: string; email: string; tel: string; senha: string; sexo: string; dataNascimento: Date; 
        registro: string; imagem: string}): Promise<UsuarioModel> {
      const {nome, tipoSangue, email, tel, senha, sexo, dataNascimento, registro, imagem} = postData;
      return this.usuarioService.createUsuario({nome, tipoSangue, email, tel, senha, sexo, dataNascimento, registro, imagem});
    }
    
    @Put('usuarios/:id')
    async updateUsuario(@Param('id') id: string, @Body() postData: {nome: string; tipoSangue: string; email: string; tel: string; senha: string; 
      sexo: string; dataNascimento: Date; registro: string; imagem: string}): Promise<UsuarioModel> {
      const {nome, tipoSangue, email, tel, senha, sexo, dataNascimento, registro, imagem} = postData
      return this.usuarioService.updateUsuario({where:{id: Number(id)}, data:{nome, tipoSangue, email, tel, senha, sexo, dataNascimento, registro, imagem}});
    }
  
    @Delete('usuarios/:id')
    async deleteUsuario(@Param('id') id: string): Promise<UsuarioModel> {
      return this.usuarioService.deleteUsuario({ id: Number(id) });
    }
  }