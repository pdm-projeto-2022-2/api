import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';


import { FuncionarioModule } from './funcionario/funcionario.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DoacaoModule } from './doacao/doacao.module';

@Module({
  imports: [FuncionarioModule, DatabaseModule,ConfigModule.forRoot({isGlobal: true}), DoacaoModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
