import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { FuncionarioModule } from './module/funcionario/funcionario.module';
import { DatabaseModule } from './module/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DoacaoModule } from './module/doacao/doacao.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './module/auth/guards/jwt-auth.guard';


@Module({
  imports: [
    FuncionarioModule,
    DatabaseModule,
    DoacaoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
