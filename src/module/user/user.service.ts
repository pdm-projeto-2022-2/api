import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IDatabaseExeptions } from '../database/database-execeptions/IDatabaseExceptions';
import { PostgreeService } from '../database/postgree/postgree.service';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private BD: PostgreeService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions: IDatabaseExeptions,
    private encrypt: HashDataService,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const existing = await this.BD.usuario.findFirst({
      where: {
        email: CreateUserDto.email,
      },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.encrypt.hashData(CreateUserDto.senha, 10);

    try {
      const data = await this.BD.usuario.create({
        data: {
          ...CreateUserDto,
          senha: hashedPassword,
        },
      });

      const user = {
        ...data,
        senha: undefined,
      };

      return user;
    } catch (error) {
      return error;
    }
  }

  async update(currentUser: User, updateUserDto: UpdateUserDto) {
    const userFind = await this.BD.usuario.findFirst({
      where: {
        id: currentUser.id,
      },
    });

    if (!userFind) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.senha) {
      updateUserDto.senha = await this.encrypt.hashData(
        updateUserDto.senha,
        10,
      );
    }

    const userUpdated = await this.BD.usuario.update({
      where: {
        id: currentUser.id,
      },
      data: updateUserDto,
    });

    const data = {
      ...userUpdated,
      senha: undefined,
    };

    return data;
  }

  async remove(CurrentUser: User) {
    try {
      const userDeleted = await this.BD.usuario.delete({
        where: {
          id: CurrentUser.id,
        },
      });

      return userDeleted;
    } catch (error) {
      return error;
    }
  }

  async getUser(currentUser: User): Promise<User> {
    try {
      const user = await this.BD.usuario.findFirst({
        where: {
          id: currentUser.id,
        },
      });

      const data = {
        ...user,
        senha: undefined,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.BD.usuario.findMany();

    return users;
  }
}
