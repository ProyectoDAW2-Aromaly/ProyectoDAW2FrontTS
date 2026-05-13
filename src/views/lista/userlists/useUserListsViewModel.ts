import { useEffect, useState } from "react";
import { IList } from "../IList.ts";
import { getPublicLists } from "../../../services/listas.services.ts";

export const useUserListsListViewModel = () => {
    const [lists, setLists] = useState<IList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLists = async () => {
            try {
                setLoading(true);
                setError("");
                const publicLists = await getPublicLists();
                setLists(publicLists);
            } catch (err) {
                setError(err instanceof Error ? err.message : "No se pudieron cargar las listas");
            } finally {
                setLoading(false);
            }
        };

        loadLists();
    }, []);

    return {
        lists,
        loading,
        error,
    };
};
