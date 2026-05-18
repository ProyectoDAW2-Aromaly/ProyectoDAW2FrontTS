import { IPerfumistaBackend } from "../interfaces/IPerfumista";
import { getHandler } from "./handler";

const customFetch = getHandler("perfumista");

export function getPerfumistaById(id_perfumista: string) {
    return customFetch<IPerfumistaBackend>(`/${id_perfumista}`, "Error al obtener el perfumista.");
}

// Necesitamos FormData porque es JSON + Archivo, si no es solo JSON
export function editarPerfumista(id_perfumista: string, formData: FormData) {
    return customFetch<IPerfumistaBackend>(`/editar/${id_perfumista}`, "Error al editar el perfumista.", true, "POST", formData);
}

export function crearPerfumista(formData: FormData) {
    return customFetch<IPerfumistaBackend>("/crear", "Error al crear el perfumista.", true, "POST", formData);
}

export function eliminarPerfumista(id_perfumista: string) {
    return customFetch<IPerfumistaBackend>(`/${id_perfumista}`, "Error al eliminar el perfumista.", true, "DELETE")
}

export function obtenerPerfumistas() {
    return customFetch<IPerfumistaBackend[]>("/listar", "Error al obtener los perfumistas.", true);
}