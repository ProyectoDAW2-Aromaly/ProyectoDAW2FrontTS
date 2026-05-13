export interface IPerfumeBackend {
    id: string
    nombre: string
    foto: string
    marca: { nombre: string }
    familiasOlfativas: string[];
}