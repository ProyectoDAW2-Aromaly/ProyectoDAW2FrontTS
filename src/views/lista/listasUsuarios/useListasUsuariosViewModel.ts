import { useEffect, useState } from "react";
import { LIST } from "../ListData.ts";
import { IList } from "../IList.ts";


export const useListasUsuariosViewModel = () => {

    const [listas, setListas] = useState<IList[]>([]);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setListas(LIST)
    }, [])

    return{
        listas
    }
}