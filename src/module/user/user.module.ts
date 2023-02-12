import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { HashModule } from '../hash/hash.module';
import { DatabaseExeceptionsModule } from '../database/database-execeptions/database-execeptions.module';

@Module({
  imports: [DatabaseModule, HashModule, DatabaseExeceptionsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
