import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"
import { IPerfumista, IPerfumistaBackend } from "./IPerfumista";
import { getPerfumistaById } from "../../services/perfumista.services";
import { mapPerfumistaBackend, mapPerfumeToCard } from "../../utils/converters/converters";
import { getPerfumesFiltros } from "../../services/perfume.services";
import { ICardPerfume } from "../../components/PerfumeCard";

export const usePerfumistaViewModel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [perfumista, setPerfumista] = useState<IPerfumista>();
    const [perfumes, setPerfumes] = useState<ICardPerfume[]>([]);
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
                const perfumesMapeados = perfumesData.map(mapPerfumeToCard);
                setPerfumes(perfumesMapeados);
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
