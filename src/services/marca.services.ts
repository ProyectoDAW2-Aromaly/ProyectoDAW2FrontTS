import { URL_SERVER } from './constantes.js';

export function getAllMarcas() {
    return fetch(`${URL_SERVER}marca`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function getMarcaPorNombre(nombre: string) {
    return fetch(`${URL_SERVER}marca/${nombre}`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener la marca.");
            return res.json();
        })
}