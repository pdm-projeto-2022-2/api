import { NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { IHandler } from "./IHandleError";

export class NotFoundErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error :PrismaClientKnownRequestError): void {
      if (error.code === 'P2025') {
        throw new NotFoundException('Data Not Exists')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  