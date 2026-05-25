import { ListaCard } from "../../../components/ListaCard";
import Pagination from "../../../components/Paginacion";
import { useListasUsuariosViewModel } from "./useListasUsuariosViewModel"

const ListasUsuarios = () => {

    const { listas, loading, error } = useListasUsuariosViewModel();

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">LISTAS DE USUARIOS</h1>

            {loading && <span className="loading loading-spinner loading-lg text-neutral"></span>}

            {error && <div className="alert alert-error max-w-2xl">{error}</div>}

            {!loading && !error && listas.length === 0 && (
                <p className="opacity-70">No hay listas publicas disponibles.</p>
            )}

            <div className="flex flex-wrap gap-12 mb-20" >

                {listas.map(lista =>
                    <ListaCard data={lista} key={lista.id} />
                )}

            </div>
            {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
            <Pagination paginaActual={3} itemsPorPagina={12} totalItems={500} handleCambiarPagina={console.log} />
        </div>
    )
}

export default ListasUsuarios;
