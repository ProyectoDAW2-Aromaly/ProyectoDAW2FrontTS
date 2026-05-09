import { URL_SERVER } from './constantes.js';
import { IPerfumeBackend, IPerfumeFiltros } from '../views/perfume/IPerfume.js';

export function getAllPerfumes() {
    return fetch(`${URL_SERVER}perfume`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function buscarPerfumes(nombre: string) {
    return fetch(`${URL_SERVER}perfume/buscar?nombre=${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function getPerfumeById(id_perfume: string) {
    return fetch(`${URL_SERVER}perfume/${id_perfume}`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener el perfume.");
            return res.json();
        })
}

export function editarPerfume(id_perfume: string, datosPerfume: IPerfumeBackend) {
    console.log(datosPerfume)
    datosPerfume.foto = ""
    return fetch(`${URL_SERVER}perfume/editar/${id_perfume}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ perfume: datosPerfume})
    }).then(res => {
        if (!res.ok) throw new Error("Error al editar el perfume.");
        return res.json();
    })
}

export function eliminarPerfume(id_perfume: string) {
    return fetch(`${URL_SERVER}perfume/${id_perfume}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => {
        if (!res.ok) throw new Error("Error al elimninar el perfume.");
        return res.json();
    })
}

export function crearPerfume(datosPerfume: IPerfumeBackend) {
    return fetch(`${URL_SERVER}perfume/nuevo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ perfume: datosPerfume })
    }).then(res => {
        if (!res.ok) throw new Error("Error al crear el perfume.");
        return res.json();
    })
}

export function obtenerMarcas() {
    return fetch(`${URL_SERVER}marca/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las marcas.");
        return res.json();
    });
}

export function obtenerNotas() {
    return fetch(`${URL_SERVER}nota/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las notas.");
        return res.json();
    });
}

export function obtenerPerfumistas() {
    return fetch(`${URL_SERVER}perfumista/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener los perfumistas.");
        return res.json();
    });
}

export function obtenerFamiliasOlfativas() {
    return fetch(`${URL_SERVER}familia/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las familias olfativas.");
        return res.json();
    });
}

export function obtenerColecciones() {
    return fetch(`${URL_SERVER}perfume/colecciones`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las colecciones.");
        return res.json();
    });
}

export function getPerfumesFiltros(filtros: IPerfumeFiltros) {
    const parametros = new URLSearchParams();

    if (filtros.marca) {
        parametros.append("marca", filtros.marca);
    }
    if (filtros.genero) {
        parametros.append("genero", filtros.genero);
    }
    if (filtros.perfumistaId) {
        parametros.append("perfumistaId", filtros.perfumistaId);
    }
    filtros.familias?.forEach(f =>
        parametros.append("familias", f)
    )
    filtros.notas?.forEach(n => 
        parametros.append("notas", n)
    )

    return fetch(`${URL_SERVER}perfume/filtros?${parametros.toString()}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then((res => {
        if (!res.ok) throw new Error("Error al obtener las colecciones.");
        return res.json();
    }))
}