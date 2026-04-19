import { CardPerfume } from "../../components/PerfumeCard";
import { FilterPanel } from "../../components/FiltroPanel";
import Pagination from "../../components/Paginacion";
import { useListaPerfumesViewModel } from "./useListaPerfumesViewModel";

const ListaPerfumes = () => {

    const { listaPerfumes, loading } = useListaPerfumesViewModel();

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

            <FilterPanel />

            <div className="flex flex-wrap gap-12 mb-20" >

                {listaPerfumes.map(list =>
                    <CardPerfume data={list} key={list.id} />
                )}

            </div>
            {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
            <Pagination currentPage={1} itemsPerPage={12} totalItems={listaPerfumes.length} handlePageChange={(page) => console.log("Ir a página:", page)} />
        </div>
    )
}

export default ListaPerfumes;