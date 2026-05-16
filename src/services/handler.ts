const URL_SERVER = `${import.meta.env.VITE_SERVER_URL}`;

export const getHandler = (base: string) => {
    return async <T>(req: string, errorMessage: string, requiresAuth: boolean = false, postType?: string, body?: BodyInit) => {
        let params: RequestInit | undefined = undefined
        if (postType)
            params = { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }

        if (requiresAuth)
            params = params ?
                { ...params, method: postType }
                : { method: postType }

        if (body)
            params = params ?
                { ...params, body }
                : { body }

        const res = await fetch(URL_SERVER + base + req, params)

        if (!res.ok) throw new Error(errorMessage);

        return await res.json() as T;
    }
}
