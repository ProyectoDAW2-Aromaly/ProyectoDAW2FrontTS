export interface IPerfumista {
    id: string;
    nombre: string;
    descripcion?: string[];
    imagen?: {
        src: string,
        alt: string
    }
}