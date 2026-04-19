import { useEffect, useState } from "react";
import { BRAND } from "../BrandData.ts";
import { IMarca } from "../IMarca.ts";

export const useListaMarcasViewModel = () => {

    const [marcas, setMarcas] = useState<IMarca[]>([]);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMarcas(BRAND)
    }, [])

    return{
        marcas
    }
}