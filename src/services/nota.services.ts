import { INotaBackend } from '../interfaces/IPerfume';
import { getHandler } from './handler.js';

const customFetch = getHandler("nota");

export function obtenerNotas() {
    return customFetch<INotaBackend[]>("/listar", "Error al obtener las notas.", true)
//     return fetch(`${URL_SERVER}/listar`, {
//         headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
//     }).then(res => {
//         if (!res.ok) throw new Error("Error al obtener las notas.");
//         return res.json();
//     });
}