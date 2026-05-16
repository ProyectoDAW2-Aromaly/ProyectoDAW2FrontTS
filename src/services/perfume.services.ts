import { IFamilias, INotaBackend, IPerfumeBackend, IPerfumeFiltros } from '../interfaces/IPerfume.js';
import { IPerfumistaBackend } from '../interfaces/IPerfumista.js';
import { getHandler } from './handler.js';

const URL_SERVER = `${import.meta.env.VITE_SERVER_URL}`;

const customFetch = getHandler("perfume");

export function getAllPerfumes() {
    return customFetch<IPerfumeBackend[]>("", "Error al obtener los perfumes");
}

export function buscarPerfumes(nombre: string) {
    return customFetch<IPerfumeBackend[]>(`/buscar?nombre=${encodeURIComponent(nombre)}`, "Error al buscar perfumes.");
}

export function getPerfumeById(id_perfume: string) {
    return customFetch<IPerfumeBackend>(`/${id_perfume}`, "Error al obtener el perfume.");
}

export function editarPerfume(id_perfume: string, formData: FormData) {
    // return customFetch<IPerfumeBackend>(`/editar/${id_perfume}`, "Error al editar el perfume.", true, "POST", formData);
    return fetch(`${URL_SERVER}perfume/editar/${id_perfume}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).then(res => {
        if (!res.ok) throw new Error("Error al editar el perfume.");
        return res.json();
    })
}

export function eliminarPerfume(id_perfume: string) {
    // return customFetch<IPerfumeBackend>(`/${id_perfume}`, "Error al eliminar el perfume.", true, "DELETE");
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

export function crearPerfume(formData: FormData) {
    // return customFetch<IPerfumeBackend>(`/nuevo`, "Error al crear el perfume.", true, "POST", formData);
    return fetch(`${URL_SERVER}perfume/nuevo`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).then(res => {
        if (!res.ok) throw new Error("Error al crear el perfume.");
        return res.json();
    })
}

export function obtenerNotas() {
    // return customFetch<INotaBackend[]>("nota/listar", "Error al obtener las notas.", true)
    return fetch(`${URL_SERVER}nota/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las notas.");
        return res.json();
    });
}

export function obtenerPerfumistas() {
    // return customFetch<IPerfumistaBackend[]>("perfumista/listar", "Error al obtener los perfumistas.", true)
    return fetch(`${URL_SERVER}perfumista/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener los perfumistas.");
        return res.json();
    });
}

export function obtenerFamiliasOlfativas() {
    // return customFetch<IFamilias[]>("familia/listar", "Error al obtener las familias olfativas.", true)
    return fetch(`${URL_SERVER}familia/listar`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
        if (!res.ok) throw new Error("Error al obtener las familias olfativas.");
        return res.json();
    });
}

// export function obtenerColecciones() {
//     return fetch(`${URL_SERVER}perfume/colecciones`, {
//         headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
//     }).then(res => {
//         if (!res.ok) throw new Error("Error al obtener las colecciones.");
//         return res.json();
//     });
// }

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

    // return customFetch<IPerfumeBackend[]>(`/filtros?${parametros.toString()}`, "Error al buscar por filtros.");

    return fetch(`${URL_SERVER}perfume/filtros?${parametros.toString()}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    }).then((res => {
        if (!res.ok) throw new Error("Error al buscar por filtros.");
        return res.json();
    }))
}