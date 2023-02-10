

export interface IHandler {
    setNext(handler: IHandler): IHandler | void;
    handle(error : any): void;
  }