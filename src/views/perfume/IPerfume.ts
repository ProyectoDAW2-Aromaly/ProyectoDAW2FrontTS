import type { IPerfumista } from "../perfumista/IPerfumista"

// Modelo que utiliza la página para organizar sus datos
export interface INota {
    tipo: "salida" | "corazon" | "base",
    nombre: string,
    foto: string
}

// Interfaz para representar perfume por ahora
export interface IPerfume {
    id: string,
    nombre: string,
    descripcion: string[],
    genero: string,
    perfumista: IPerfumista[],
    yearSalida: string,
    coleccion: string,
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
    id: string
    nombre: string
    descripcion: string | string[]
    genero: string
    fechaLanzamiento?: string
    coleccion?: string
    foto: string
    marca?: {
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