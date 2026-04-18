// * El ViewModel es un hook de React (por eso empieza con use) que se utiliza para contener toda la lógica de una pantalla.
// * Normalmente se le llama hook a una función cuyo nombre empieza por use y dentro usa hooks nativos de React, ejemplo: useState, useEffect
// * https://react.dev/reference/react/hooks

import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"
import type { IPerfume } from "./IPerfume";
import { getPerfumeById } from "../../peticiones";

interface IRating {
    general?: number,
    autumn?: boolean,
    summer?: boolean,
    price?: number,
    duration?: number
}

const getGeneroImagen = (val: string) => {
    switch (val.toLowerCase()) {
        case "hombre":
            return "/perfume-info/icons/gender/male-icon.svg";
        case "mujer":
            return "/perfume-info/icons/gender/female-icon.svg";
        case "unisex":
            return "/perfume-info/icons/gender/unisex-icon.svg";
        default:
            return "";
    }
}

interface INotaBackend {
    nombre: string
    foto: string
}

interface IPerfumeBackend {
    id: string
    nombre: string
    descripcion: string
    genero: string
    fechaLanzamiento: string
    coleccion: string
    foto: string
    marca?: {
        nombre: string
        foto: string
    }
    perfumistas?: {
        id: string
        nombre: string
    }[]
    familiasOlfativas?: {
        nombre: string
    }[]
    notas?: {
        salida: INotaBackend[]
        corazon: INotaBackend[]
        base: INotaBackend[]
    }
}

export const usePerfumeViewModel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState<IRating>() // Aquí en vez de number, sería rating (por la base de datos) y modificas la propiedad
    const [liked, setLiked] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        // const id = searchParams.get("id")
        if (id) {
            getPerfumeById(id)
                .then((p: IPerfumeBackend) => {
                    const datoFormateado: IPerfume = {
                        id: p.id,
                        nombre: p.nombre,
                        descripcion: Array.isArray(p.descripcion)
                            ? p.descripcion
                            : [p.descripcion],
                        
                        imagen: { src: p.foto, alt: p.nombre },
                        logo: {
                            src: p.marca?.foto ?? "/default-marca.png",
                            alt: p.marca?.nombre ?? "Marca"
                        },
                        familias: p.familiasOlfativas?.map(f => f.nombre) ?? [],
                        genero: getGeneroImagen(p.genero),
                        perfumista: p.perfumistas?.map(pf => ({
                            id: pf.id,
                            nombre: pf.nombre
                        })) ?? [],
                        yearSalida: p.fechaLanzamiento ?? "-",
                        coleccion: p.coleccion,
                        piramide: [
                            {
                                categoria: "Notas de Salida",
                                notas: p.notas?.salida?.map(n => ({
                                    nombre: n.nombre,
                                    imagenSrc: n.foto
                                })) ?? []
                            },
                            {
                                categoria: "Notas de Corazón",
                                notas: p.notas?.corazon?.map(n => ({
                                    nombre: n.nombre,
                                    imagenSrc: n.foto
                                })) ?? []
                            },
                            {
                                categoria: "Notas de Fondo",
                                notas: p.notas?.base?.map(n => ({
                                    nombre: n.nombre,
                                    imagenSrc: n.foto
                                })) ?? []
                            }
                        ]
                    };
                    setSelectedPerfume(datoFormateado);
                    setLoading(false);
                }).catch(error => {
                    console.error(error);
                    setLoading(false);
                    navigate("/not-found");
                });
        } else {
            navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
        }
    }, [searchParams, navigate])

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
        handleRatingChange,
        liked,
        setLiked
    }
}