import { UserRol } from "../services/usuarios.services";

export interface IUser {
  id: number,
  username: string;
  pfp: string;
  rol: UserRol;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  descripcion?: string;
  foto?: string;
  rol: UserRol;
}

export interface ILoginUser {
  username: string;
  password: string;
}