import { IsEnum } from "class-validator";

export class BuscarTipoSanguineoDto {

    @IsEnum(tipo_sanguineo)
    tipo_sanguineo: tipo_sanguineo
}
