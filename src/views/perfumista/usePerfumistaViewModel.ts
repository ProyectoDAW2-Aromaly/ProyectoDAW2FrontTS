import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"
import { IPerfumista } from "../../interfaces/IPerfumista";
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

    const cargarDatos = async () => {
        try {
            if (!id) throw Error();

            const datosPerfumista = await getPerfumistaById(id);
            setPerfumista(mapPerfumistaBackend( datosPerfumista, id))
            const datosPerfumes = await getPerfumesFiltros({ perfumistaId: id });
            setPerfumes(datosPerfumes);
        } catch (err) {
            console.log(err);
            setError("No se ha podido cargar el perfumista.");
            navigate("/not-found");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) {
            navigate("/not-found");
            return;
        }
        cargarDatos();
    }, []);

    return { perfumista, perfumes, loading, error };
}
