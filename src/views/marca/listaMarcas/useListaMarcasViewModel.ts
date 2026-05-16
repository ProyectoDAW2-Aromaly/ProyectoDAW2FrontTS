import { useEffect, useState } from "react";
import { IMarca } from "../../../interfaces/IMarca.ts";
import { getAllMarcas } from "../../../services/marca.services.ts";
import { mapMarcaBackend } from "../utils/MarcaMapper.ts";

export const useListaMarcasViewModel = () => {

    const [marcas, setMarcas] = useState<IMarca[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllMarcas()
            .then((datos) => {
                const marcasFormateadas: IMarca[] = datos.map(mapMarcaBackend);
                setMarcas(marcasFormateadas);
                setLoading(false);
            });
    }, []);

    return{
        marcas,
        loading
    }
}