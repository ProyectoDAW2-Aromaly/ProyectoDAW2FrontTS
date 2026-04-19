import { FilterPanel } from "../../../components/FiltroPanel";
import { ListCard } from "../../../components/ListCard";
import Pagination from "../../../components/Paginacion";
import { useUserListsListViewModel } from "./useUserListsViewModel"

const UserLists = () => {

    const { lists } = useUserListsListViewModel();

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">LISTAS DE USUARIOS</h1>

            {/* <div className="divider mb-10"></div> */}
            <FilterPanel/>

            <div className="flex flex-wrap gap-12 mb-20" >

                {lists.map(list =>
                    <ListCard data={list} key={list.id} />
                )}

            </div>
            {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
            <Pagination currentPage={3} itemsPerPage={12} totalItems={500} handlePageChange={console.log} />
        </div>
    )
}

export default UserLists;