import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { IMarca, IMarcaBackend } from "../../../interfaces/IMarca.ts";
import { getMarcaPorNombre } from "../../../services/marca.services.ts";
import { mapMarcaBackend } from "../utils/MarcaMapper.ts";
import { getPerfumesFiltros } from "../../../services/perfume.services.ts";
import { IPerfumeBackend } from "../../../interfaces/IPerfume.ts";

export const useMarcaViewModel = () => {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [marca, setMarca] = useState<IMarca>();
    const [perfumes, setPerfumes] = useState<IPerfumeBackend[]>([]);
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
                setPerfumes(perfumesData);
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