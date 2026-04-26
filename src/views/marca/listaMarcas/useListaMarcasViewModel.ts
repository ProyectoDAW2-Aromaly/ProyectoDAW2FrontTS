import { useEffect, useState } from "react";
import { IMarca, IMarcaBackend } from "../IMarca.ts";
import { getAllMarcas } from "../../../services/marca.services.ts";

export const useListaMarcasViewModel = () => {

    const [marcas, setMarcas] = useState<IMarca[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        getAllMarcas()
            .then((datos: IMarcaBackend[]) => {
                console.log("Datos brutos del backend:", datos);
                const marcasFormateadas: IMarca[] = datos.map((m) => ({
                    
                    nombre: m.nombre ?? "Sin nombre",
                    isdarklogo: m.isdarklogo ?? false,
                    foto: m.foto ?? "/default.jpg"
                }));
                setMarcas(marcasFormateadas);
                setLoading(false);
            });
    }, []);

    return{
        marcas,
        loading
    }
}