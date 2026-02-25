import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { IPerfume } from "./IPerfume";
import { PERFUMES } from "./Perfumes";




export const usePerfumeViewModel = () => {
    const [searchParams] = useSearchParams();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    useEffect(() => {
        const search = searchParams.get("id")
        if (search) {
            // Prueba búsqueda de perfume. Aquí va la consulta a backend
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPerfume(PERFUMES.find(perfume => perfume.id === search))
        }
    }, [searchParams])

    return {
        selectedPerfume
    }
}