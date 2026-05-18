import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IMarca } from "../../../interfaces/IMarca.ts";
import { getMarcaPorNombre } from "../../../services/marca.services.ts";
import { mapMarcaBackend } from "../utils/MarcaMapper.ts";
import { getPerfumesFiltros } from "../../../services/perfume.services.ts";
import { IPerfumeBackend } from "../../../interfaces/IPerfume.ts";

export const useMarcaViewModel = () => {
    const { nombre } = useParams();
    const navigate = useNavigate();

    const [marca, setMarca] = useState<IMarca>();
    const [perfumes, setPerfumes] = useState<IPerfumeBackend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarDatos = async () => {
        try {
            const datosMarca = await getMarcaPorNombre(nombre ?? "")
            setMarca(mapMarcaBackend(datosMarca))
            const datosPerfumes = await getPerfumesFiltros({ marca: nombre })
            setPerfumes(datosPerfumes);
        } catch (err) {
            console.error(err);
            setError("No se ha podido cargar la marca.");
            navigate("/not-found");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!nombre) {
            navigate("/not-found");
            return;
        }
        cargarDatos()

    }, [])

    return { marca, perfumes, loading, error };
}