import { useEffect, useState } from "react";
import { IList } from "../IList.ts";
import { getPublicLists } from "../../../services/listas.services.ts";

export const useListasUsuariosViewModel = () => {
    const [listas, setListas] = useState<IList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadListas = async () => {
            try {
                setLoading(true);
                setError("");
                const publicLists = await getPublicLists();
                setListas(publicLists);
            } catch (err) {
                setError(err instanceof Error ? err.message : "No se pudieron cargar las listas");
            } finally {
                setLoading(false);
            }
        };

        loadListas();
    }, []);

    return {
        listas,
        loading,
        error,
    }
}
