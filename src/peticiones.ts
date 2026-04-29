import { normalizeBrandImage, normalizeNotaImage, normalizePerfumeImage } from "./utils/assets";

const URL_SERVER = `http://localhost:8080/api`;

// Interfaces para backend
export interface IPerfumeBackend {
    id: string;
    nombre: string;
    descripcion: string;
    genero: string;
    fechaLanzamiento?: string;
    coleccion?: string;
    foto: string;
    marca?: {
        nombre: string;
        foto: string;
    };
    perfumistas?: {
        id: string;
        nombre: string;
    }[];
    familiasOlfativas?: Array<string | { nombre: string }>;
    notas?: {
        salida?: Array<{ nombre: string; foto: string }>;
        corazon?: Array<{ nombre: string; foto: string }>;
        base?: Array<{ nombre: string; foto: string }>;
    };
}

// Obtener todos los perfumes
export const getAllPerfumes = async (): Promise<IPerfumeBackend[]> => {
    try {
        const response = await fetch(`${URL_SERVER}/perfumes`);
        if (!response.ok) {
            throw new Error('Error al obtener perfumes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getAllPerfumes:', error);
        throw error;
    }
};

// Obtener notas de un perfume
export const getNotasByPerfumeId = async (perfumeId: string): Promise<{ salida: Array<{ nombre: string; foto: string }>; corazon: Array<{ nombre: string; foto: string }>; base: Array<{ nombre: string; foto: string }> }> => {
    try {
        const response = await fetch(`${URL_SERVER}/notas/perfume/${perfumeId}`);
        if (!response.ok) {
            console.warn('No se pudieron obtener las notas para el perfume:', perfumeId);
            return { salida: [], corazon: [], base: [] };
        }
        const data = await response.json();
        const notas: Array<{ nombre: string; foto: string; tipo: string }> = data.result || [];

        // Agrupar notas por tipo
        return {
            salida: notas.filter((n) => n.tipo === 'salida').map((n) => ({ nombre: n.nombre, foto: normalizeNotaImage(n.foto) })),
            corazon: notas.filter((n) => n.tipo === 'corazon' || n.tipo === 'corazón').map((n) => ({ nombre: n.nombre, foto: normalizeNotaImage(n.foto) })),
            base: notas.filter((n) => n.tipo === 'base').map((n) => ({ nombre: n.nombre, foto: normalizeNotaImage(n.foto) })),
        };
    } catch (error) {
        console.error('Error en getNotasByPerfumeId:', error);
        return { salida: [], corazon: [], base: [] };
    }
};

// Obtener un perfume por ID
export const getPerfumeById = async (id: string): Promise<IPerfumeBackend | null> => {
    try {
        const response = await fetch(`${URL_SERVER}/perfumes/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error('Error al obtener perfume');
        }
        const perfumeData = await response.json();
        
        // Obtener las notas por separado
        const notas = await getNotasByPerfumeId(id);
        
        // Combinar datos del perfume con sus notas
        return {
            ...perfumeData,
            foto: normalizePerfumeImage(perfumeData.foto),
            marca: perfumeData.marca
                ? {
                    ...perfumeData.marca,
                    foto: normalizeBrandImage(perfumeData.marca.foto),
                }
                : perfumeData.marca,
            notas: notas
        };
    } catch (error) {
        console.error('Error en getPerfumeById:', error);
        throw error;
    }
};

// Crear un nuevo perfume
export const createPerfume = async (perfumeData: ICreatePerfumeData) => {
    try {
        const response = await fetch(`${URL_SERVER}/perfumes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(perfumeData),
        });
        
        if (!response.ok) {
            throw new Error('Error al crear perfume');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en createPerfume:', error);
        throw error;
    }
};

// Actualizar un perfume
export const updatePerfume = async (id: string, perfumeData: IUpdatePerfumeData) => {
    try {
        const response = await fetch(`${URL_SERVER}/perfumes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(perfumeData),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar perfume');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en updatePerfume:', error);
        throw error;
    }
};

// Eliminar un perfume
export const deletePerfume = async (id: string) => {
    try {
        const response = await fetch(`${URL_SERVER}/perfumes/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar perfume');
        }
        
        return true;
    } catch (error) {
        console.error('Error en deletePerfume:', error);
        throw error;
    }
};

// Importar interfaces desde los archivos locales para mantener compatibilidad
export interface IUser {
    id: string;
    userName: string;
    email: string;
    role: 'ADMIN' | 'PREMIUM';
    pfp: string;
}

// Interfaz para listas (compatibilidad con ListData)
export interface IList {
    id: string;
    username: string;
    premium: boolean;
    coffee: boolean;
    pfp: string;
    title: string;
    perfumes: string[];
}

// Interfaces para datos de perfumes
export interface ICreatePerfumeData {
    nombre: string;
    descripcion: string;
    genero: string;
    fechaLanzamiento: string;
    coleccion?: string;
    foto: string;
    idMarca: number;
    familiasOlfativas: number[];
    perfumistas: number[];
}

export interface IUpdatePerfumeData {
    nombre?: string;
    descripcion?: string;
    genero?: string;
    fechaLanzamiento?: string;
    coleccion?: string;
    foto?: string;
    idMarca?: number;
    familiasOlfativas?: number[];
    perfumistas?: number[];
}

// Interfaces para datos de perfil
export interface IListaPerfil {
    id: number;
    nombre: string;
    esPublica: boolean;
    totalPerfumes: number;
}

export interface IPerfumeFavoritoPerfil {
    id: number;
    nombre: string;
    foto: string;
    marca: string;
    familiasOlfativas: string[];
}

// Servicios de perfil (usar interfaces del perfil local)
export interface IPerfil {
    user: IUser;
    listasCreadas: IListaPerfil[];
    perfumesFavoritos: IPerfumeFavoritoPerfil[];
}

export const getMyProfile = async (): Promise<IPerfil> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No hay sesión activa");
    }

    try {
        const response = await fetch(`${URL_SERVER}/perfil/mi-perfil`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener el perfil');
        }
        
        const data = await response.json();
        // Map backend user data to frontend format
        const backendUser = data.result?.user;
        const mappedPerfil: IPerfil = {
            user: {
                id: backendUser?.id?.toString() || '',
                userName: backendUser?.username || '',
                email: backendUser?.email || '',
                pfp: backendUser?.foto || '',
                role: backendUser?.rol as 'ADMIN' | 'PREMIUM'
            },
            listasCreadas: data.result?.listasCreadas || [],
            perfumesFavoritos: data.result?.perfumesFavoritos || []
        };
        return mappedPerfil;
    } catch (error) {
        console.error('Error en getMyProfile:', error);
        throw error instanceof Error ? error : new Error('No se pudo cargar el perfil');
    }
};

export const updateMyProfile = async (userData: Partial<IUser>): Promise<IUser> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No hay sesión activa");
    }
    try {
        const response = await fetch(`${URL_SERVER}/perfil`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar perfil');
        }
        
        const data = await response.json();
        // Map backend response to frontend IUser format
        const backendUser = data.result?.user;
        return {
            id: backendUser?.id,
            userName: backendUser?.username,
            email: backendUser?.email || '',
            role: backendUser?.rol as 'ADMIN' | 'PREMIUM',
            pfp: backendUser?.foto || ''
        };
    } catch (error) {
        console.error('Error en updateMyProfile:', error);
        throw error;
    }
};

// Servicios de listas adicionales
export const createMyList = async (listData: { nombre: string; esPublica: boolean }) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(listData),
        });
        
        if (!response.ok) {
            throw new Error('Error al crear lista');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en createMyList:', error);
        throw error;
    }
};

export const deleteMyList = async (idLista: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas/${idLista}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar lista');
        }
        
        return true;
    } catch (error) {
        console.error('Error en deleteMyList:', error);
        throw error;
    }
};

export const updateMyList = async (idLista: number, listData: { nombre: string; esPublica: boolean }) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas/${idLista}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(listData),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar lista');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en updateMyList:', error);
        throw error;
    }
};

// Servicios de listas
export interface IListaPerfumeOption {
    id: number;
    nombre: string;
    totalPerfumes: number;
    contienePerfume: boolean;
}

export const getMyListsForPerfume = async (perfumeId: number): Promise<IListaPerfumeOption[]> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas/usuario/perfume/${perfumeId}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        if (!response.ok) {
            console.warn('Endpoint de listas no disponible, devolviendo array vacío');
            return [];
        }
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.warn('Error en getMyListsForPerfume, devolviendo array vacío:', error);
        return [];
    }
};

export const addPerfumeToList = async (idLista: number, idPerfume: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas/${idLista}/perfumes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ idPerfume }),
        });
        
        if (!response.ok) {
            throw new Error('Error al añadir perfume a lista');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en addPerfumeToList:', error);
        throw error;
    }
};

export const removePerfumeFromList = async (idLista: number, idPerfume: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/listas/${idLista}/perfumes/${idPerfume}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar perfume de lista');
        }
        
        return true;
    } catch (error) {
        console.error('Error en removePerfumeFromList:', error);
        throw error;
    }
};

// Servicios de votaciones
export const addFavorite = async (perfumeId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/votaciones/favorito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ perfumeId, tipo: 'favorito' }),
        });
        
        if (!response.ok) {
            console.warn('Endpoint de favoritos no disponible, simulando éxito');
            return { success: true };
        }
        
        return await response.json();
    } catch (error) {
        console.warn('Error en addFavorite, simulando éxito:', error);
        return { success: true };
    }
};

export const removeFavorite = async (perfumeId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/votaciones/favorito/${perfumeId}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        
        if (!response.ok) {
            console.warn('Endpoint de favoritos no disponible, simulando éxito');
            return true;
        }
        
        return true;
    } catch (error) {
        console.warn('Error en removeFavorite, simulando éxito:', error);
        return true;
    }
};

export const isFavorite = async (perfumeId: number): Promise<boolean> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL_SERVER}/votaciones/favorito/${perfumeId}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                return false;
            }
            console.warn('Endpoint de favoritos no disponible, devolviendo false');
            return false;
        }
        
        const data = await response.json();
        return data.result?.isFavorite || false;
    } catch (error) {
        console.warn('Error en isFavorite, devolviendo false:', error);
        return false;
    }
};
