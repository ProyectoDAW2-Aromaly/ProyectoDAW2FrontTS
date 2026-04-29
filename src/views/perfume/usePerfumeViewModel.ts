// * El ViewModel es un hook de React (por eso empieza con use) que se utiliza para contener toda la lógica de una pantalla.
// * Normalmente se le llama hook a una función cuyo nombre empieza por use y dentro usa hooks nativos de React, ejemplo: useState, useEffect
// * https://react.dev/reference/react/hooks

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import type { IPerfume, IValoracion } from "./IPerfume";
import { getPerfumeById, addFavorite, removeFavorite, isFavorite } from "../../peticiones";

// Interfaces para datos del backend
interface IPerfumistaBackend {
    id: string;
    nombre: string;
}

interface IFamiliaOlfativaBackend {
    id?: number;
    nombre: string;
}

type IRating = IValoracion;

export const usePerfumeViewModel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [rating, setRating] = useState<IRating>() // Aquí en vez de number, sería rating (por la base de datos) y modificas la propiedad
    const [liked, setLiked] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const [, setLoadingPerfume] = useState(false);

    useEffect(() => {
        const loadPerfume = async () => {
            const search = searchParams.get("id")
            if (!search) {
                navigate("/not-found")
                return
            }

            try {
                setLoadingPerfume(true)
                const perfumeData = await getPerfumeById(search)
                
                if (!perfumeData) {
                    navigate("/not-found")
                    return
                }

                // Convertir datos del backend a formato del frontend (similar a rama Lorena)
                const frontendPerfume: IPerfume = {
                    id: perfumeData.id,
                    nombre: perfumeData.nombre,
                    descripcion: perfumeData.descripcion,
                    genero: perfumeData.genero === 'masculino' ? '/perfume-info/icons/genre/male-icon.svg' : 
                           perfumeData.genero === 'femenino' ? '/perfume-info/icons/genre/female-icon.svg' : 
                           '/perfume-info/icons/genre/unisex-icon.svg',
                    perfumista: perfumeData.perfumistas?.map((p: IPerfumistaBackend) => ({ id: p.id, nombre: p.nombre })) || [],
                    yearSalida: perfumeData.fechaLanzamiento ? 
    (typeof perfumeData.fechaLanzamiento === 'string' ? perfumeData.fechaLanzamiento.split('-')[0] : String(perfumeData.fechaLanzamiento).split('-')[0]) : '',
                    coleccion: perfumeData.coleccion || '',
                    imagen: {
                        src: perfumeData.foto,
                        alt: perfumeData.nombre
                    },
                    logo: {
                        src: perfumeData.marca?.foto || '/brand/default-logo.png',
                        alt: perfumeData.marca?.nombre || 'Marca'
                    },
                    familias: perfumeData.familiasOlfativas?.map((f: string | IFamiliaOlfativaBackend) => typeof f === 'string' ? f : f.nombre) || [],
                    notas: []
                }

                // Debug: Ver qué datos de notas llegan del backend
                console.log('Notas del backend:', perfumeData.notas);
                
                // Procesar notas si existen (similar a rama Lorena)
                if (perfumeData.notas) {
                    const procesarNotas = (notas: Array<{ nombre: string; foto: string }>, tipo: 'salida' | 'corazon' | 'base') => 
                        notas?.map(nota => ({ tipo, nombre: nota.nombre, foto: nota.foto })) || []

                    frontendPerfume.notas = [
                        ...procesarNotas(perfumeData.notas.salida || [], 'salida'),
                        ...procesarNotas(perfumeData.notas.corazon || [], 'corazon'),
                        ...procesarNotas(perfumeData.notas.base || [], 'base')
                    ]
                }

                setSelectedPerfume(frontendPerfume)
            } catch (error) {
                console.error('Error loading perfume:', error)
                navigate("/not-found")
            } finally {
                setLoadingPerfume(false)
            }
        }

        loadPerfume()
    }, [searchParams, navigate])

    // Cargar estado de favorito cuando cambia el perfume seleccionado
    useEffect(() => {
        const loadFavoriteStatus = async () => {
            if (!selectedPerfume?.id) return;
            
            try {
                const isFav = await isFavorite(Number(selectedPerfume.id));
                setLiked(isFav);
            } catch (error) {
                console.error('Error loading favorite status:', error);
                setLiked(false);
            }
        };

        loadFavoriteStatus();
    }, [selectedPerfume?.id]);

    /**
     * * Función genérica que permite cambiar cualquiera de los atributos de rating y los muestra a la hora de utilizar la función.
     * @param attr Es la propiedad de rating que se va a modificar
     * @param value Es el valor que se va a poner en esa propiedad
     * @example handleRatingChange("general", undefined)
     */
    const handleRatingChange = (attr: keyof IRating, value?: number | boolean | string) => {
        setRating({ ...rating, [attr]: value })
    }

    /**
     * * Alterna el estado de favorito de un perfume
     */
    const toggleFavorite = async () => {
        if (!selectedPerfume?.id) return;
        
        try {
            setLoadingFavorite(true);
            
            if (liked) {
                await removeFavorite(Number(selectedPerfume.id));
                setLiked(false);
            } else {
                await addFavorite(Number(selectedPerfume.id));
                setLiked(true);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // Revertir estado si hubo error
            setLiked(!liked);
        } finally {
            setLoadingFavorite(false);
        }
    };

    return {
        selectedPerfume,
        rating,
        handleRatingChange,
        liked,
        setLiked,
        toggleFavorite,
        loadingFavorite
    }
}
