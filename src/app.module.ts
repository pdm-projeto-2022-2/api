import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionarioController } from './controller/funcionario.controller';
import { PrismaService } from './prisma.service';
import { FuncionarioService } from './sevice/funcionario.service';

@Module({
  imports: [],
  controllers: [AppController, FuncionarioController],
  providers: [AppService, FuncionarioService, PrismaService],
})
export class AppModule {}
