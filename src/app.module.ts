import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoacaoController } from './controller/doacao.controller';
import { FuncionarioController } from './controller/funcionario.controller';
import { UsuarioController } from './controller/usuario.controller';
import { PrismaService } from './prisma.service';
import { DoacaoService } from './sevice/doacao.service';
import { FuncionarioService } from './sevice/funcionario.service';
import { UsuarioService } from './sevice/usuario.service';

@Module({
  imports: [],
  controllers: [AppController, FuncionarioController, UsuarioController, DoacaoController],
  providers: [AppService, FuncionarioService, PrismaService, UsuarioService, DoacaoService],
})
export class AppModule {}
