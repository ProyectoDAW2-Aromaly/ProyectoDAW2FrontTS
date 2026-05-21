import Paginacion from "../../../components/Paginacion"
import MarcaCard from "../../../components/MarcaCard";
import { useListaMarcasViewModel } from "./useListaMarcasViewModel";
import { usePaginacion } from "../../../hooks/usePaginacion";
import { IMarca } from "../../../interfaces/IMarca";

const ListaMarcas = () => {

    const { marcas, loading } = useListaMarcasViewModel();
    const marcasPorPagina = 12;

    const {
        pagina,
        setPagina,
        itemsTotales,
        itemsPaginacion: marcasVisibles
    } = usePaginacion<IMarca>(marcas, marcasPorPagina);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">LISTADO DE MARCAS</h1>

                <div className="divider"></div>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {marcasVisibles.map(lista =>
                        <MarcaCard data={lista} key={lista.nombre} />
                    )}
                </div>

                <Paginacion 
                    paginaActual={pagina} 
                    itemsPorPagina={marcasPorPagina} 
                    totalItems={itemsTotales} 
                    handleCambiarPagina={setPagina} 
                />
            </div>
        </>
    )
}

export default ListaMarcas;