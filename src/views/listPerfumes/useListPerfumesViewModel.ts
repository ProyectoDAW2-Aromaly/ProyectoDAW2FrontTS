import { useEffect, useState } from "react";
import { IPerfume } from "../perfume/IPerfume";
import { PERFUMES } from "../perfume/PerfumesData";

export const useListPerfumesViewModel = () => {
    const [listPerfumes, setListPerfumes] = useState<IPerfume[]>([]);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setListPerfumes(PERFUMES)
    }, [])

    return {
        listPerfumes
    }
}