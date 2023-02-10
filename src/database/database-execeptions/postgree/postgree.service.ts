import { ForbiddenException, Provider } from '@nestjs/common';
import { IDatabaseExeptions } from '../IDatabaseExceptions';
import { ForeingKeyErrorHandlePostgree } from './handlers/ForeingKeyErrorHandle';
import { IHandler } from './handlers/IHandleError';
import { NotFoundErrorHandlePostgree } from './handlers/NotFoundErrorPostgree';
import { UniqueErrorHandlePostgree } from './handlers/UniqueErrorHandlePostgree';
import { PrimaryKeyErrorHandlePostgree } from './handlers/UniquePrimaryKeyErrorPostgree';



export class ExecptionsPostgreeService implements IDatabaseExeptions{

public checkError(error :any) {
    const handlers = this.factoryHandlers()
      handlers.forEach((handle,index) =>{
        handle.handle(error)
         if(index === (handlers.length - 1)){
            throw new ForbiddenException('A Exception not Maped occour in database')
         }
         handle.setNext(handlers[index+1])
      })
  }

private factoryHandlers() :Array<IHandler>{
    const handlers = [
      new UniqueErrorHandlePostgree,
      new ForeingKeyErrorHandlePostgree,
      new PrimaryKeyErrorHandlePostgree,
      new NotFoundErrorHandlePostgree,
    ]
    return handlers
}
}

export const execptionsPostgreeService :Provider = {
    provide: 'EXCEPTIONS_POSTGREE',
    useClass: ExecptionsPostgreeService
}