import Paginacion from "../../../components/Paginacion"
import MarcaCard from "../../../components/MarcaCard";
import { useListaMarcasViewModel } from "./useListaMarcasViewModel";
import { FiltroPanel } from "../../../components/FiltroPanel";
import { useState } from "react";

const ListaMarcas = () => {
    // const navigate = useNavigate();

    // const goToBrand = (brandName: string) => {
    //     navigate(`/brands?name=${brandName}`);
    // }

    const { marcas, loading } = useListaMarcasViewModel();

    const [paginaActual, setPaginaActual] = useState(1);
    const marcasPorPagina = 12;

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    // Si paginaActual es 1: (1 * 12) = 12. El slice llega hasta el índice 12 (sin incluirlo).
    const ultimoItem = paginaActual * marcasPorPagina;
    // Si paginaActual es 1: (12 - 12) = 0. Empezamos en el índice 0.
    const primerItem = ultimoItem - marcasPorPagina;
    const marcasVisibles = marcas.slice(primerItem, ultimoItem);

    return (
        <>
            
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">LISTADO DE MARCAS</h1>

                {/* <div className="divider mb-10"></div> */}
                <FiltroPanel/>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {marcasVisibles.map(lista =>
                        <MarcaCard data={lista} key={lista.nombre} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Paginacion 
                    paginaActual={paginaActual} 
                    itemsPorPagina={marcasPorPagina} 
                    totalItems={marcas.length} 
                    handleCambiarPagina={(pagina) => 
                        setPaginaActual(pagina)
                    } />
            </div>
        </>
    )
}

export default ListaMarcas;