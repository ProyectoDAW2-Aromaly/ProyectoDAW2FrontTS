import { ICardPerfume, PerfumeCard } from "../../components/PerfumeCard";
import { FiltroPanel } from "../../components/FiltroPanel";
import Paginacion from "../../components/Paginacion";
import { useListaPerfumesViewModel } from "./useListaPerfumesViewModel";
import { usePaginacion } from "../../hooks/usePaginacion";

const ListaPerfumes = () => {

    const { listaPerfumes, loading } = useListaPerfumesViewModel();
    const perfumesPorPagina = 12;
    
        const {
            pagina,
            setPagina,
            itemsTotales,
            itemsPaginacion: perfumesVisibles
        } = usePaginacion<ICardPerfume>(listaPerfumes, perfumesPorPagina);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">TODOS LOS PERFUMES</h1>

            <FiltroPanel />

            <div className="flex flex-wrap gap-12 mb-20" >

                {perfumesVisibles.map(lista =>
                    <PerfumeCard data={lista} key={lista.id} />
                )}

            </div>
            <Paginacion
                paginaActual={pagina}
                itemsPorPagina={perfumesPorPagina}
                totalItems={itemsTotales}
                handleCambiarPagina={setPagina}
            />
        </div>
    )
}

export default ListaPerfumes;