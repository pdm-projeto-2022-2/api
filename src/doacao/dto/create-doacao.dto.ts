import { status_doacao } from "@prisma/client"
import {  IsDate, IsEnum, IsNumber, IsString } from "class-validator"

export class CreateDoacaoDto {

  @IsString()  
  data  :string

  @IsNumber()
  doadorId :number

  @IsEnum(status_doacao)
  status :status_doacao
}
