import { ICardPerfume } from "../../components/PerfumeCard";
import { IPerfumeBackendFiltros } from "../../views/perfume/IPerfume";
import { IPerfumista, IPerfumistaBackend } from "../../views/perfumista/IPerfumista";

export const mapPerfumeToCard = (data: IPerfumeBackendFiltros): ICardPerfume => ({
    id: data.id,
    nombre: data.nombre,
    marca: data.marca.nombre,
    foto: data.foto,
    familiasOlfativas: data.familiasOlfativas?.map(f => f.nombre) ?? []
});

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