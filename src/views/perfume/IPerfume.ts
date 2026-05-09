import { ICardPerfume } from "../../components/PerfumeCard"
import type { IPerfumista } from "../perfumista/IPerfumista"

export interface INota {
    tipo: "salida" | "corazon" | "base",
    nombre: string,
    foto: string
}

export interface IMarca {
    nombre: string;
    foto: string;
}

export interface IPerfume {
    id: string,
    nombre: string,
    descripcion: string,
    genero: string,
    perfumista: IPerfumista[],
    yearSalida: string,
    coleccion: string,
    marca: IMarca,
    imagen: {
        src: string,
        alt: string
    },
    logo: {
        src: string,
        alt: string
    },
    familias: string[],
    notas: INota[]
}

export interface IValoracion {
    general?: number,
    autumn?: boolean,
    invierno?: boolean,
    primavera?: boolean,
    verano?: boolean,
    precio?: number,
    duracion?: number
}

export type IValoracionKey = keyof IValoracion;
export type IValoracionNumeroKey = "general" | "precio" | "duracion";
export type IValoracionBooleanKey = "autumn" | "invierno" | "primavera" | "verano";

export interface INotaBackend {
    nombre: string
    foto: string
    tipo?: "salida" | "corazon" | "corazón" | "base"
}

export interface IPerfumeBackend {
    id?: string
    nombre: string
    descripcion: string
    genero: string
    fechaLanzamiento?: string
    coleccion?: string
    foto: string
    marca?: string | {
        nombre: string
        foto: string
    }
    perfumistas?: {
        id: string
        nombre: string
    }[]
    familiasOlfativas?: Array<string | { nombre: string }>
    notas?: INotaBackend[] | {
        salida?: INotaBackend[]
        corazon?: INotaBackend[]
        base?: INotaBackend[]
    }
}

export interface ItemListado {
    nombre: string;
    id?: string;
    coleccion?: string;
}

export interface IPerfumeFiltros {
    marca?: string;
    genero?: string;
    perfumistaId?: string;
    familias?: string[];
    notas?: string[];
}

export interface IPerfumeBackendFiltros {
    id: string;
    nombre: string;
    foto: string;
    marca: {
        nombre: string;
    };
    familiasOlfativas: {
        nombre: string;
    }[];
}

export const mapPerfumeToCard = (data: IPerfumeBackendFiltros): ICardPerfume => ({
    id: data.id,
    nombre: data.nombre,
    marca: data.marca.nombre,
    foto: data.foto,
    familiasOlfativas: data.familiasOlfativas?.map(f => f.nombre) ?? []
});
