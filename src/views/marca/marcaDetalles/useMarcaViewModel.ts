import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { IMarca, IMarcaBackend } from "../IMarca.ts";
import { getMarcaPorNombre } from "../../../services/marca.services.ts";
import { mapMarcaBackend } from "../utils/MarcaMapper.ts";
import { getPerfumesFiltros } from "../../../services/perfume.services.ts";
import { mapPerfumeToCard } from "../../../utils/converters/converters.ts";
import { ICardPerfume } from "../../../components/PerfumeCard.tsx";

export const useMarcaViewModel = () => {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [marca, setMarca] = useState<IMarca>();
    const [perfumes, setPerfumes] = useState<ICardPerfume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!nombre) {
            navigate("/not-found");
            return;
        }

        getMarcaPorNombre(nombre ?? "")
            .then((data: IMarcaBackend) => {
                setMarca(mapMarcaBackend(data))

                return getPerfumesFiltros({
                    marca: nombre
                })
            })
            .then((perfumesData) => {
                const perfumesMapeados = perfumesData.map(mapPerfumeToCard);
                setPerfumes(perfumesMapeados);
            })
            .catch((err) => {
                console.error(err);
                setError("No se ha podido cargar la marca.");
                navigate("/not-found");
            })
            .finally(() => {
                setLoading(false)
            })
    }, [nombre, navigate, searchParams])

    return { marca, perfumes, loading, error };
}