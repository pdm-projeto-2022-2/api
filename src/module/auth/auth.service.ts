import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IDatabaseExeptions } from '../../../dist/database/database-execeptions/IDatabaseExceptions.d';
import { PostgreeService } from '../database/postgree/postgree.service';
import { User } from '../user/entities/user.entity';
import { UnauthorizedError } from './errors/unauthorized.error';
import { LoginRequestBody } from './models/LoginRequestBody';
import { UserPayload } from './models/UserPayload';
import { UserResponseToken } from './models/UserResponseToken';
import { CompareHashDataService } from '../hash/compare-hash-data/compare-hash-data.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private BD: PostgreeService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions: IDatabaseExeptions,
    private compareHash: CompareHashDataService,
  ) {}

  async adminLogin(user: LoginRequestBody): Promise<UserResponseToken> {
    const { senha, email } = user;
    const userExists = await this.BD.funcionario.findFirst({
      where: {
        nome: email,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Funcionario não encontrado');
    }

    const validPassword = await this.compareHash.compareHash(
      senha,
      userExists.senha,
    );

    if (!validPassword) {
      throw new UnauthorizedError(
        'Email address or password provided is incorrect.',
      );
    }

    const payload: UserPayload = {
      sub: userExists.id,
      userRole: userExists.isAdmin ? 'ADMIN' : '',
      email: userExists.nome,
      name: userExists.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userLogin(user: LoginRequestBody): Promise<UserResponseToken> {
    const { senha, email } = user;
    const userExists = await this.BD.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const validPassword = await this.compareHash.compareHash(
      senha,
      userExists.senha,
    );

    if (!validPassword) {
      throw new UnauthorizedError(
        'Email address or password provided is incorrect.',
      );
    }

    const payload: UserPayload = {
      sub: userExists.id,
      email: userExists.nome,
      name: userExists.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, senha: string): Promise<User> {
    const user = await this.BD.usuario.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const isSenhaValid = await bcrypt.compare(senha, user.senha);

      if (isSenhaValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
