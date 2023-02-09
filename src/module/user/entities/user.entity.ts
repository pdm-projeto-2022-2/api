export class User {
  id?: string;
  nome: string;
  tipoSangue: string;
  email: string;
  tel: string;
  password: string;
  sexo: string;
  dataNascimento: Date | string;
  registro: string;
  imagem?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
