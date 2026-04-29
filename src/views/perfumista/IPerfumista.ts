export interface IPerfumista {
    id: string;
    nombre: string;
    descripcion?: string[];
    imagen?: {
        src: string,
        alt: string
    }
}

export interface IPerfumistaBackend {
    id?: string;
    nombre: string;
    descripcion: string;
    foto?: string;
}
