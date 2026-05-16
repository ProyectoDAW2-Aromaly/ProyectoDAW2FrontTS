import { useEffect, useState } from "react";
import type { ICardPerfume } from "../../components/PerfumeCard";
import { getAllPerfumes } from "../../services/perfume.services";

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

                const cardPerfumes: ICardPerfume[] = perfumesData.map((perfume: { id: string; nombre: string; marca?: { nombre?: string }; foto: string; familiasOlfativas?: Array<string | { nombre: string }> }) => ({
                    id: perfume.id,
                    nombre: perfume.nombre,
                    marca: perfume.marca?.nombre || 'Marca desconocida',
                    foto: perfume.foto,
                    familiasOlfativas: perfume.familiasOlfativas?.map(f =>
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
