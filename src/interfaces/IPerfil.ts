import type { UserRol } from "../services/usuarios.services";

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
  perfumeFotos?: string[];
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

export interface ICreateListFormProps {
  loading: boolean;
  onCreate: (data: { nombre: string; esPublica: boolean }) => Promise<void>;
}

export interface IManageListFormProps {
  lista: IListaPerfil;
  loading: boolean;
  onSave: (data: { nombre: string; esPublica: boolean }) => Promise<void>;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export interface IUpdateProfilePayload {
  email: string;
  descripcion: string;
  foto: string;
}

export interface IBackendUser {
  id?: number;
  username: string;
  email?: string;
  descripcion?: string;
  foto?: string;
  rol?: UserRol;
}

export interface IBackendPerfumeFavorito {
  id: number;
  nombre?: string;
  foto?: string;
  marca?: string;
  familiasOlfativas?: string[];
}