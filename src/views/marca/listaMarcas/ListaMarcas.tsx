import Paginacion from "../../../components/Paginacion"
import MarcaCard from "../../../components/MarcaCard";
import { useListaMarcasViewModel } from "./useListaMarcasViewModel";
import { usePaginacion } from "../../../hooks/usePaginacion";
import { IMarca } from "../../../interfaces/IMarca";
import { Buscador } from "../../../components/Buscador";
import { useState } from "react";

const ListaMarcas = () => {

    const { marcas, loading } = useListaMarcasViewModel();
    const [nombre, setNombre] = useState("");
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

                {/* <div className="divider mb-10"></div> */}
                {/* <FiltroPanel/> */}
                <Buscador value={nombre} onChange={setNombre} />

                <div className="flex flex-wrap gap-12 mb-20" >

                    {marcasVisibles.map(lista =>
                        <MarcaCard data={lista} key={lista.nombre} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
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