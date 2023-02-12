import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  async getUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.getUser(user);
  }

  @Put('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.update(user, updateUserDto);
  }

  @Delete('delete')
  async remove(@CurrentUser() currentUser: User): Promise<boolean> {
    return this.userService.remove(currentUser);
  }

  @IsAdmin()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
