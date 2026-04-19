import Paginacion from "../../../components/Paginacion"
import MarcaCard from "../../../components/MarcaCard";
import { useListaMarcasViewModel } from "./useListaMarcasViewModel";
import { FiltroPanel } from "../../../components/FiltroPanel";

const ListaMarcas = () => {
    // const navigate = useNavigate();

    // const goToBrand = (brandName: string) => {
    //     navigate(`/brands?name=${brandName}`);
    // }

    const { marcas } = useListaMarcasViewModel();

    return (
        <>
            
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">LISTADO DE MARCAS</h1>

                {/* <div className="divider mb-10"></div> */}
                <FiltroPanel/>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {marcas.map(lista =>
                        <MarcaCard data={lista} key={lista.nombre} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Paginacion paginaActual={3} itemsPorPagina={12} totalItems={500} handleCambiarPagina={console.log} />
            </div>
        </>
    )
}

export default ListaMarcas;