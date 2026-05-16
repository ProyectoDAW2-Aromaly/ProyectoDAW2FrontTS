import { IMarcaBackend } from '../interfaces/IMarca.js';
import { getHandler } from './handler.js';

const customFetch = getHandler("marca");

export function getAllMarcas() {
    return customFetch<IMarcaBackend[]>("", "Error de conexión.");
}

export function getMarcaPorNombre(nombre: string) {
    return customFetch<IMarcaBackend>(`/${nombre}`, "Error al obtener la marca.");
}

export function obtenerMarcas() {
    return customFetch<IMarcaBackend[]>("/listar", "Error al obtener las marcas.", true)
}