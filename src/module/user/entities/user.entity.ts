export class User {
  id: number;
  nome: string;
  tipoSangue: string;
  email: string;
  tel: string;
  senha: string | any;
  sexo: string;
  dataNascimento: Date | string;
  registro: string;
  imagem?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
