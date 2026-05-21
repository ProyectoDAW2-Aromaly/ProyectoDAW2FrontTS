import { IVotacion } from "../interfaces/IVotacion";
import { getHandler } from "./handler";

const customFetch = getHandler("votaciones");

export function crearComentario(votacion: IVotacion) {
    return customFetch<IVotacion>("/comentario", "Error al crear un comentario.", true, "POST", JSON.stringify(votacion), true);
}

export function eliminarComentario(id_comentario: number) {
    return customFetch<IVotacion>(`/comentario/${id_comentario}`, "Error al eliminar un comentario.", true, "DELETE");
}

export function obtenerComentariosPorPerfume(id_perfume: number) {
    return customFetch<IVotacion>(`/comentario/${id_perfume}`, "Error al obtener los comentarios del perfume.")
}