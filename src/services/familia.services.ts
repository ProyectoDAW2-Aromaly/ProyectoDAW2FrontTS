import { IFamilias } from '../interfaces/IPerfume.js';
import { getHandler } from './handler.js';

const customFetch = getHandler("familia");


export function obtenerFamiliasOlfativas() {
    return customFetch<IFamilias[]>("/listar", "Error al obtener las familias olfativas.", true)
    // return fetch(`${URL_SERVER}/listar`, {
    //     headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    // }).then(res => {
    //     if (!res.ok) throw new Error("Error al obtener las familias olfativas.");
    //     return res.json();
    // });
}