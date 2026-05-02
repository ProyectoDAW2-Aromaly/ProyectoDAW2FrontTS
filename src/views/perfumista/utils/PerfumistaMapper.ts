import { IPerfumista, IPerfumistaBackend } from "../IPerfumista";

export const mapPerfumistaBackend = (
    data: IPerfumistaBackend,
    id: string
): IPerfumista => ({
    id,
    nombre: data.nombre,
    descripcion: data.descripcion
        ? data.descripcion.split("\n")
        : [],
    imagen: data.foto
        ? {
            src: data.foto,
            alt: data.nombre ?? "perfumista"
        } : undefined
});