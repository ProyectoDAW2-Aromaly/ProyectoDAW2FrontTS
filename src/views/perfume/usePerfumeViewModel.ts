import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import type { IPerfume } from "./IPerfume";
import { PERFUMES } from "./Perfumes";

interface IRating {
    general?: number,
    autumn?: boolean,
    summer?: boolean
}

export const usePerfumeViewModel = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [rating, setRating] = useState<IRating>() // Aquí en vez de number, sería rating (por la base de datos) y modificas la propiedad
    useEffect(() => {
        const search = searchParams.get("id")
        if (search) {
            // Prueba búsqueda de perfume. Aquí va la consulta a backend
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPerfume(PERFUMES.find(perfume => perfume.id === search))
        } else {
            navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
        }
    }, [searchParams])

    /**
     * * Función genérica que permite cambiar cualquiera de los atributos de rating y los muestra a la hora de utilizar la función.
     * @param attr Es la propiedad de rating que se va a modificar
     * @param value Es el valor que se va a poner en esa propiedad
     * @example handleRatingChange("general", undefined)
     */
    const handleRatingChange = (attr: keyof IRating, value?: number | boolean | string) => {
        setRating({ ...rating, [attr]: value })
    }

    return {
        selectedPerfume,
        rating,
        handleRatingChange
    }
}