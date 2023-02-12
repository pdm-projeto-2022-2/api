import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { IHandler } from './IHandleError';

export class ForeingKeyErrorHandlePostgree implements IHandler {
  private nextHandler: IHandler;

  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(error: PrismaClientKnownRequestError): void {
    if (error.code === 'P2003') {
      throw new ForbiddenException('Foreing Key Violate');
    }

    if (this.nextHandler) {
      this.nextHandler.handle(error);
    }
  }
}
