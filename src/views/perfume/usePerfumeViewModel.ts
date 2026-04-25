// * El ViewModel es un hook de React (por eso empieza con use) que se utiliza para contener toda la lógica de una pantalla.
// * Normalmente se le llama hook a una función cuyo nombre empieza por use y dentro usa hooks nativos de React, ejemplo: useState, useEffect
// * https://react.dev/reference/react/hooks

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IPerfume, IPerfumeBackend, IValoracion, IValoracionBooleanKey, IValoracionNumeroKey } from "./IPerfume";
import { getPerfumeById } from "../../services/perfume.services";
import { mapPerfumeFromBackend } from "./utils/PerfumeMapper";

export const usePerfumeViewModel = () => {
    const navigate = useNavigate();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState<IValoracion>({}) // Aquí en vez de number, sería rating (por la base de datos) y modificas la propiedad
    const [liked, setLiked] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getPerfumeById(id)
                .then((p: IPerfumeBackend) => {
                    setSelectedPerfume(mapPerfumeFromBackend(p));
                    setLoading(false);
                }).catch(error => {
                    console.error(error);
                    setLoading(false);
                    navigate("/not-found");
                });
        } else {
            navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
        }
    }, [id, navigate])

    /**
     * * Función genérica que permite cambiar cualquiera de los atributos de rating y los muestra a la hora de utilizar la función.
     * @param attr Es la propiedad de rating que se va a modificar
     * @param value Es el valor que se va a poner en esa propiedad
     * @example handleRatingChange("general", undefined)
     */
    const handleNumberRatingChange = (attr: IValoracionNumeroKey, value?: number) => {
        setRating((prev) => ({ ...prev, [attr]: value }));
    }

    const handleSeasonRatingChange = (attr: IValoracionBooleanKey, value: boolean) => {
        setRating((prev) => ({ ...prev, [attr]: value }));
    }

    const toggleLiked = () => {
        setLiked((prev) => !prev);
    }

    return {
        selectedPerfume,
        rating,
        handleNumberRatingChange,
        handleSeasonRatingChange,
        liked,
        toggleLiked,
        loading
    }
}