import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/guards/jwt-auth.guard';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
