import type { IPerfumista } from "../perfumista/IPerfumista"

// Modelo que utiliza la página para organizar sus datos
interface INota {
    nombre: string,
    imagenSrc?: string
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
    piramide: {
        categoria: string,
        notas: INota[]
    }[]
}