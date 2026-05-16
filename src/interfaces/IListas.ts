import { ICardPerfume } from "../components/PerfumeCard";

export interface IListas {
    id: string,
    nombreUsuario: string,
    premium: boolean,
    cafe: boolean,
    pfp: string,
    titulo: string,
    perfumes: string[],
    rol?: string
}

export interface IListaPerfumeOption {
	id: number;
	nombre: string;
	esPublica: boolean;
	totalPerfumes: number;
	contienePerfume: boolean;
}

export interface IListaDetalle {
	id: number;
	nombre: string;
	esPublica: boolean;
	totalPerfumes: number;
	creadorUsername: string;
	creadorFoto?: string;
	creadorRol?: string;
	perfumes: ICardPerfume[];
}

export interface IBackendPublicList {
	id: number;
	nombre: string;
	creadorUsername?: string;
	creadorFoto?: string;
	creadorRol?: string;
	perfumeFotos?: string[];
}

export interface IBackendListPerfume {
	id: number;
	nombre: string;
	marca?: string;
	foto?: string;
	familiasOlfativas?: string[];
}

export interface IBackendListDetail extends IBackendPublicList {
	esPublica: boolean;
	totalPerfumes: number;
	creadorUsername: string;
	perfumes?: IBackendListPerfume[];
}

export interface ICreateListPayload {
	nombre: string;
	esPublica: boolean;
}
