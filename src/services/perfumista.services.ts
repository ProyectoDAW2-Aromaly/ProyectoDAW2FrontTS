import { URL_SERVER } from './constantes.js';
import { IPerfumistaBackend } from '../views/perfumista/IPerfumista.js';

export function getNombrePerfumistas() {
    return fetch(`${URL_SERVER}perfumista/listar`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function getPerfumistaById(id_perfumista: number) {
    return fetch(`${URL_SERVER}perfumista/${id_perfumista}`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener el perfumista.");
            return res.json();
        })
}

// * sin hacer aún
export function editarPerfumista(id_perfumista: number, datosPerfumista: IPerfumistaBackend) {
    return fetch(`${URL_SERVER}perfumista/editar/${id_perfumista}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ perfumista: datosPerfumista})
    }).then(res => {
        if (!res.ok) throw new Error("Error al editar el perfumista.");
        return res.json();
    })
}

// * Sin hacer aún
export function crearPerfumista(datosPerfumista: IPerfumistaBackend) {
    return fetch(`${URL_SERVER}perfumista/nuevo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ perfumista: datosPerfumista })
    }).then(res => {
        if (!res.ok) throw new Error("Error al crear el perfumista.");
        return res.json();
    })
}