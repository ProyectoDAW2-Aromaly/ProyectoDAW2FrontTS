import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"
import { IPerfumista, IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { getPerfumistaById } from "../../services/perfumista.services";
import { mapPerfumistaBackend } from "../../utils/converters/converters";
import { getPerfumesFiltros } from "../../services/perfume.services";
import { IPerfumeBackend } from "../../interfaces/IPerfume";

export const usePerfumistaViewModel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [perfumista, setPerfumista] = useState<IPerfumista>();
    const [perfumes, setPerfumes] = useState<IPerfumeBackend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            navigate("/not-found");
            return;
        }

        getPerfumistaById(id)
            .then((data: IPerfumistaBackend) => {
                setPerfumista(mapPerfumistaBackend(data, id));

                return getPerfumesFiltros({
                    perfumistaId: id
                })
            })
            .then((perfumesData) => {
                setPerfumes(perfumesData);
            })
            .catch((err) => {
                console.log(err);
                setError("No se ha podido cargar el perfumista.");
                navigate("/not-found");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    return { perfumista, perfumes, loading, error };
}
