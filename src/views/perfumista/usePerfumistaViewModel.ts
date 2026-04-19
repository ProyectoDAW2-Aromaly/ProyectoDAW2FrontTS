// import { useEffect, useState } from "react";
// import { PERFUMERS } from "./Perfumista";
// import { useNavigate, useParams } from "react-router";
// import type { IPerfumista } from "./IPerfumista";

// export const usePerfumerViewModel = () => {

//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//     const [selectedPerfumer, setSelectedPerfumer] = useState<IPerfumer>()

//     useEffect(() => {
//         const search = searchParams.get("id")
//         if (search) {
//             // Prueba búsqueda de perfume. Aquí va la consulta a backend
//             // eslint-disable-next-line react-hooks/set-state-in-effect
//             setSelectedPerfumer(PERFUMERS.find(perfumer => perfumer.id === search))
//         } else {
//             navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
//         }
//     }, [searchParams])

//     return (selectedPerfumer);
// }

// ! Para que funcione hardcodeado

import { useEffect, useState } from "react";
import { PERFUMERS } from "./Perfumista";
import { useParams } from "react-router";
import type { IPerfumista } from "./IPerfumista";

export const usePerfumistaViewModel = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const [selectedPerfumer, setSelectedPerfumer] = useState<IPerfumista>(PERFUMERS[0]);

    useEffect(() => {
        // Solo buscamos si el ID existe
        if (id) {
            const found = PERFUMERS.find(p => p.id === String(id));
            if (found) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSelectedPerfumer(found);
            } else {
                console.error("ID no encontrado en PERFUMERS:", id);
            }
        }
    }, [id]);

    return selectedPerfumer;
}