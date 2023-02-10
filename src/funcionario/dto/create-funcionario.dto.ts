import { IsBoolean, IsString } from "class-validator"

export class CreateFuncionarioDto {
    @IsString()
    nome      :string

    @IsString()
    matricula :string

    @IsString()
    senha     :string
    
    @IsBoolean()
    isAdmin   :boolean

    @IsString()
    imagem    :string
}
