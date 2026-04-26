import { URL_SERVER } from './constantes.js';

export function getAllPerfumes() {
    return fetch(`${URL_SERVER}perfume`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function getPerfumeById(id_perfume: string | number) {
    return fetch(`${URL_SERVER}perfume/${id_perfume}`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener el perfume.");
            return res.json();
        })
}