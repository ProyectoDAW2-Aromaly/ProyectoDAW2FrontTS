import { useState } from "react";

// T -> Genérico, reutilizable para todo tipo de datos, marcas, perfumistas, etc
export function usePaginacion<T>(items: T[], itemsPorPagina: number) {
    const [pagina, setPagina] = useState(1);

    const itemsTotales = items.length;

    const inicio = (pagina - 1) * itemsPorPagina;
    const final = inicio + itemsPorPagina;

    const itemsPaginacion = items.slice(inicio, final);

    return {
        pagina,
        setPagina,
        itemsTotales,
        itemsPaginacion
    }
}