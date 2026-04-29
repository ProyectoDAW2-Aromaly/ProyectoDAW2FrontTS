import { PerfumeCard } from "../../components/PerfumeCard";
import { FiltroPanel } from "../../components/FiltroPanel";
import Paginacion from "../../components/Paginacion";
import { useListPerfumesViewModel } from "./useListPerfumesViewModel";

const ListPerfumes = () => {
    const { listPerfumes, loading, error } = useListPerfumesViewModel();

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">TODOS LOS PERFUMES</h1>
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">TODOS LOS PERFUMES</h1>
                <div className="alert alert-error max-w-md">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">TODOS LOS PERFUMES</h1>

            <FiltroPanel />

            <div className="flex flex-wrap gap-12 mb-20" >
                {listPerfumes.map((perfume) =>
                    <PerfumeCard data={perfume} key={perfume.id} />
                )}
            </div>
            
            {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
            <Paginacion currentPage={3} itemsPerPage={12} totalItems={listPerfumes.length} handlePageChange={console.log} />
        </div>
    )
}

export default ListPerfumes;