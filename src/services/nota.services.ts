import { INotaBackend } from '../interfaces/IPerfume';
import { getHandler } from './handler.js';

const customFetch = getHandler("nota");

export function obtenerNotas() {
    return customFetch<INotaBackend[]>("/listar", "Error al obtener las notas.", true);
}