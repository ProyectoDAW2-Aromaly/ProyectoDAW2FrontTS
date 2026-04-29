const URL_SERVER = `http://localhost:8080/api`;

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
export const getNotasByPerfumeId = async (perfumeId: string) => {
    try {
        const response = await fetch(`${URL_SERVER}/notas/perfume/${perfumeId}`);
        if (!response.ok) {
            console.warn('No se pudieron obtener las notas para el perfume:', perfumeId);
            return { salida: [], corazon: [], base: [] };
        }
        return await response.json();
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
            notas: notas
        };
    } catch (error) {
        console.error('Error en getPerfumeById:', error);
        throw error;
    }
};

// Crear un nuevo perfume
export const createPerfume = async (perfumeData: any) => {
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
export const updatePerfume = async (id: string, perfumeData: any) => {
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
