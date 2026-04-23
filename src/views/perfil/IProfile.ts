import type { UserRol } from "../../servicios/usuarios.services";

export interface IUserProfile {
  id?: number;
  userName: string;
  email: string;
  descripcion: string;
  pfp: string;
  rol: UserRol;
}

export interface IListaPerfil {
  id: number;
  nombre: string;
  esPublica: boolean;
  totalPerfumes: number;
}

export interface IPerfumeFavoritoPerfil {
  id: number;
  nombre: string;
  foto: string;
  marca: string;
  familiasOlfativas: string[];
}

export interface IPerfil {
  user: IUserProfile;
  listasCreadas: IListaPerfil[];
  perfumesFavoritos: IPerfumeFavoritoPerfil[];
}
