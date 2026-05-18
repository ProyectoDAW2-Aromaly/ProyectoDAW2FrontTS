import { IPerfumeBackend, IPerfumeFiltros } from '../interfaces/IPerfume.js';
import { getHandler } from './handler.js';

const customFetch = getHandler("perfume");

export function getAllPerfumes() {
    return customFetch<IPerfumeBackend[]>("", "Error al obtener los perfumes");
}

export function buscarPerfumes(nombre: string) {
    return customFetch<IPerfumeBackend[]>(`/buscar?nombre=${encodeURIComponent(nombre)}`, "Error al buscar perfumes.");
}

export function getPerfumeById(id_perfume: string) {
    return customFetch<IPerfumeBackend>(`/${id_perfume}`, "Error al obtener el perfume.");
}

export function editarPerfume(id_perfume: string, formData: FormData) {
    return customFetch<IPerfumeBackend>(`/editar/${id_perfume}`, "Error al editar el perfume.", true, "POST", formData);
}

export function eliminarPerfume(id_perfume: string) {
    return customFetch<IPerfumeBackend>(`/${id_perfume}`, "Error al eliminar el perfume.", true, "DELETE");
}

export function crearPerfume(formData: FormData) {
    return customFetch<IPerfumeBackend>(`/nuevo`, "Error al crear el perfume.", true, "POST", formData);
}

export function getPerfumesFiltros(filtros: IPerfumeFiltros) {

    const parametros = new URLSearchParams();

    if (filtros.marca) {
        parametros.append("marca", filtros.marca);
    }
    // if (filtros.genero) {
    //     parametros.append("genero", filtros.genero);
    // }
    if (filtros.perfumistaId) {
        parametros.append("perfumistaId", filtros.perfumistaId);
    }
    // filtros.familias?.forEach(f =>
    //     parametros.append("familias", f)
    // )
    // filtros.notas?.forEach(n => 
    //     parametros.append("notas", n)
    // )

    return customFetch<IPerfumeBackend[]>(`/filtros?${parametros.toString()}`, "Error al buscar por filtros.", true);
}