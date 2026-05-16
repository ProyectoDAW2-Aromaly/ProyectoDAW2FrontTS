import { IMarcaBackend } from "./IMarca";
import type { IPerfumista, IPerfumistaBackend } from "./IPerfumista"

export interface INota {
    tipo: "salida" | "corazon" | "base",
    nombre: string,
    foto: string
}

export interface IFamilias {
    nombre: string
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
    marca?: IMarcaBackend
    perfumistas?: IPerfumistaBackend[]
    familiasOlfativas?: IFamilias[]
    notas?: INotaBackend[]
}

export interface IPerfumeBuscar {
    id: number;
    nombre: string;
    foto: string;
};

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
