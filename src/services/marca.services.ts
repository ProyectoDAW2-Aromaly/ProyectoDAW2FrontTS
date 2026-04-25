import { URL_SERVER } from './constantes.js';

export function getAllMarcas() {
    return fetch(`${URL_SERVER}marca`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}