// import { useEffect, useState } from "react";
// import { PERFUMERS } from "./Perfumista";
// import { useNavigate, useParams } from "react-router";
// import type { IPerfumista } from "./IPerfumista";

// export const usePerfumerViewModel = () => {

//     const navigate = useNavigate();
//     const { id } = useParams(); // Obtenemos el id de la URL /perfumista/:id
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [selectedPerfumer, setSelectedPerfumer] = useState<IPerfumista>();

//     useEffect(() => {
//         if (id) {
//             const found = PERFUMERS.find(p => p.id === id);
//             if (found) {
//                 setSelectedPerfumer(found);
//             } else {
//                 navigate("/not-found");
//             }
//         } else {
//             navigate("/not-found");
//         }
//     }, [id, navigate]);

//     // if (search) {
//     //     // Prueba búsqueda de perfume. Aquí va la consulta a backend
//     //     // // eslint-disable-next-line react-hooks/set-state-in-effect
//     //     setSelectedPerfumer(PERFUMERS.find(perfumista => perfumista.id === search))
//     // } else {
//     //     navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
//     // }
//     // }, [searchParams])

//     return (selectedPerfumer);
// }

import { useEffect, useState } from "react";
import { PERFUMERS } from "./Perfumista";
import { useNavigate, useParams } from "react-router";
import type { IPerfumista } from "./IPerfumista";

export const usePerfumerViewModel = () => {
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
                // Si no existe el ID, podrías navegar a una ruta de error
                // navigate("/not-found"); 
            }
        }
    }, [id]); // Solo depende de id

    return selectedPerfumer;
}