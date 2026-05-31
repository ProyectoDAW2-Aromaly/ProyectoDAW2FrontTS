import { useState } from "react";
import { ListaCard } from "../../../components/ListaCard";
import Paginacion from "../../../components/Paginacion";
import { useListasUsuariosViewModel } from "./useListasUsuariosViewModel"

const ITEMS_POR_PAGINA = 12;

const ListasUsuarios = () => {

    const { listas, loading, error } = useListasUsuariosViewModel();

    const [paginaListas, setPaginaListas] = useState(1);
    
        const listasPaginadas = listas.slice(
            (paginaListas - 1) * ITEMS_POR_PAGINA,
            paginaListas * ITEMS_POR_PAGINA
        );

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">LISTAS DE USUARIOS</h1>

            <div className="divider"></div>

            {loading && <span className="loading loading-spinner loading-lg text-neutral"></span>}

            {error && <div className="alert alert-error max-w-2xl">{error}</div>}

            {!loading && !error && listas.length === 0 && (
                <p className="opacity-70">No hay listas públicas disponibles.</p>
            )}

            <div className="flex flex-wrap gap-12 mb-20" >

                {listasPaginadas.map(lista =>
                    <ListaCard data={lista} key={lista.id} />
                )}

            </div>
            <Paginacion
                totalItems={listas.length}
                itemsPorPagina={ITEMS_POR_PAGINA}
                paginaActual={paginaListas}
                handleCambiarPagina={setPaginaListas}
            />
        </div>
    )
}

export default ListasUsuarios;
