import Pagination from "../../../components/Paginacion"
import BrandCard from "../../../components/MarcaCard";
import { useBrandListViewModel } from "./useBrandListViewModel";
import { FilterPanel } from "../../../components/FiltroPanel";

const BrandsList = () => {
    // const navigate = useNavigate();

    // const goToBrand = (brandName: string) => {
    //     navigate(`/brands?name=${brandName}`);
    // }

    const {brands} = useBrandListViewModel();

    return (
        <>
            
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <h1 className="text-4xl mb-5">LISTADO DE MARCAS</h1>

                {/* <div className="divider mb-10"></div> */}
                <FilterPanel/>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {brands.map(list =>
                        <BrandCard data={list} key={list.name} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Pagination currentPage={3} itemsPerPage={12} totalItems={500} handlePageChange={console.log} />
            </div>
        </>
    )
}

export default BrandsList;