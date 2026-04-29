import { useEffect, useState } from "react";
import type { ICardPerfume } from "../../components/PerfumeCard";
import { getAllPerfumes } from "../../peticiones";

export const useListPerfumesViewModel = () => {
    const [listPerfumes, setListPerfumes] = useState<ICardPerfume[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPerfumes = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const perfumesData = await getAllPerfumes();
                
                // Debug: Ver qué datos llegan del backend
                console.log('Perfumes del backend:', perfumesData);
                
                // Convertir datos del backend a formato ICardPerfume
                const cardPerfumes: ICardPerfume[] = perfumesData.map(perfume => ({
                    id: perfume.id,
                    name: perfume.nombre,
                    brand: perfume.marca?.nombre || 'Marca desconocida',
                    image: perfume.foto,
                    olfactoryFamilies: perfume.familiasOlfativas?.map(f => 
                        typeof f === 'string' ? f : f.nombre
                    ) || []
                }));
                
                setListPerfumes(cardPerfumes);
            } catch (err) {
                console.error('Error loading perfumes:', err);
                setError('No se pudieron cargar los perfumes');
            } finally {
                setLoading(false);
            }
        };

        loadPerfumes();
    }, []);

    return {
        listPerfumes,
        loading,
        error
    }
}