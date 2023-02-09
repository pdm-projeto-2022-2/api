import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.prismaService.usuario.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      const user = await this.prismaService.usuario.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      //delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFind = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!userFind) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const data = { ...updateUserDto };

    const userUpdated = await this.prismaService.usuario.update({
      where: {
        id,
      },
      data,
    });

    delete userUpdated.password;

    return userUpdated;
  }

  async remove(id: string) {
    return await this.prismaService.usuario.delete({
      where: {
        id,
      },
    });
  }

  async getUser(currentUser: User): Promise<User> {
    try {
      const user = await this.prismaService.usuario.findFirst({
        where: {
          email: currentUser.email,
        },
      });

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.usuario.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prismaService.usuario.findMany();

    return users;
  }
}
