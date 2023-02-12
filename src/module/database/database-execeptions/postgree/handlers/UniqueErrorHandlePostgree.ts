import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { IHandler } from './IHandleError';

export class UniqueErrorHandlePostgree implements IHandler {
  private nextHandler: IHandler;

  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(error: PrismaClientKnownRequestError): void {
    if (error.code === 'P2002') {
      throw new ForbiddenException('Unique Constraint Violated');
    }

    if (this.nextHandler) {
      this.nextHandler.handle(error);
    }
  }
}
