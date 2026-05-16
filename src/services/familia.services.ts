import { IFamilias } from '../interfaces/IPerfume.js';
import { getHandler } from './handler.js';

const customFetch = getHandler("familia");


export function obtenerFamiliasOlfativas() {
    return customFetch<IFamilias[]>("/listar", "Error al obtener las familias olfativas.", true);
}