import { ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { IHandler } from "./IHandleError";


export class PrimaryKeyErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error :PrismaClientKnownRequestError): void {
      if (error.code === '23505') {
        throw new ForbiddenException('Primary Key Violated')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  