import { useEffect, useState } from "react";
import { LIST } from "../ListData.ts";
import { IList } from "../IList.ts";


export const useUserListsListViewModel = () => {

    const [lists, setLists] = useState<IList[]>([]);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLists(LIST)
    }, [])

    return{
        lists
    }
}