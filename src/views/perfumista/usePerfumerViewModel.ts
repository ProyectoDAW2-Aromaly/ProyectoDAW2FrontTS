import { useEffect, useState } from "react";
// import { PERFUMERS } from "./Perfumista";
import { useNavigate, useSearchParams } from "react-router";
import type { IPerfumista } from "./IPerfumista";

export const usePerfumerViewModel = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedPerfumer, setSelectedPerfumer] = useState<IPerfumista>()

    // useEffect(() => {
    //     const search = searchParams.get("id")
    //     if (search) {
    //         // Prueba búsqueda de perfume. Aquí va la consulta a backend
    //         // // eslint-disable-next-line react-hooks/set-state-in-effect
    //         // setSelectedPerfumer(PERFUMERS.find(perfumista => perfumista.id === search))
    //     } else {
    //         navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
    //     }
    // }, [searchParams])

    return (selectedPerfumer);
}