
const URL_SERVER = `${import.meta.env.VITE_SERVER_URL}`;

export function getNombrePerfumistas() {
    return fetch(`${URL_SERVER}perfumista/listar`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
}

export function getPerfumistaById(id_perfumista: string) {
    return fetch(`${URL_SERVER}perfumista/${id_perfumista}`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener el perfumista.");
            return res.json();
        })
}

// Necesitamos FormData porque es JSON + Archivo, si no es solo JSON
export function editarPerfumista(id_perfumista: string, formData: FormData) {
    return fetch(`${URL_SERVER}perfumista/editar/${id_perfumista}`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).then(res => {
        if (!res.ok) throw new Error("Error al editar el perfumista.");
        return res.json();
    })
}

export function crearPerfumista(formData: FormData) {
    return fetch(`${URL_SERVER}perfumista/crear`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).then(res => {
        if (!res.ok) throw new Error("Error al crear el perfumista.");
        return res.json();
    })
}

export function eliminarPerfumista(id_perfumista: string) {
    return fetch(`${URL_SERVER}perfumista/${id_perfumista}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => {
        if (!res.ok) throw new Error("Error al elimninar el perfumista.");
        return res.json();
    })
}