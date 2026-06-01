const URL_SERVER = `${import.meta.env.VITE_SERVER_URL}`;

export const getHandler = (base: string) => {
    // Devuelve funicón asíncrona genérica, puede devolver cualquier tipo (IPerfumeBackend, IPerfumistaBackend, etc)
    // req -> endpoint (/perfumes)
    // applyContentType -> si se debe añadir Content-Type
    return async <T>(req: string, errorMessage: string, requiresAuth: boolean = false, postType?: string, body?: BodyInit, applyContentType: boolean = false) => {
        // credentials: "include" hace que se envíen cookies automáticamente
        let params: RequestInit = { credentials: "include" }

        // Si la petición requiere autenticación, añade el token al header
        if (requiresAuth)
            params = { ...params, headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }

        // Si se necesita indicar que el contenido es JSON
        if (applyContentType)
            params = params ?
                { ...params, headers: { ...params.headers, "Content-Type": "application/json" } } // conserva headers anteriores (como Authorization)
                : { headers: { "Content-Type": "application/json" } }

        // Si se especifica el método HTTP (POST, PUT, etc.)
        if (postType)
            params = params ?
                { ...params, method: postType }
                : { method: postType }

        // Si hay cuerpo en la petición
        if (body)
            params = params ?
                { ...params, body }
                : { body }

        // URL_SERVER + base + req
        const res = await fetch(URL_SERVER + base + req, params)

        // Error personalizado
        if (!res.ok) throw new Error(errorMessage);

        // Si todo va bien, devuelve la respuesta en formato JSON tipado como T
        return await res.json() as T;
    }
}
