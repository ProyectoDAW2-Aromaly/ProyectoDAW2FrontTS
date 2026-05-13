import Paginacion from "../../../components/Paginacion"
import { useMarcaViewModel } from "./useMarcaViewModel";
import { ICardPerfume, PerfumeCard } from "../../../components/PerfumeCard";
import { FiltroPanel } from "../../../components/FiltroPanel";
import { usePaginacion } from "../../../hooks/usePaginacion";

const PaginaMarca = () => {

    const { marca, perfumes, loading, error} = useMarcaViewModel();
    const perfumesPorPagina = 12;

    const {
        pagina,
        setPagina,
        itemsTotales,
        itemsPaginacion: perfumesVisibles
    } = usePaginacion<ICardPerfume>(perfumes, perfumesPorPagina)

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }
    if(error) return <p>{error}</p>
    if (!marca) return null;

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <div className="w-full h-60 dark:bg-[#FFF7ED] flex items-center justify-center rounded-lg">
                    <figure className="w-60 h-60 flex items-center justify-center rounded-lg">
                        <img
                            src={marca?.foto}
                            alt={marca?.nombre}
                        />
                    </figure>
                </div>
                
                <FiltroPanel/>

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
        </>
    )
}

export default PaginaMarca;