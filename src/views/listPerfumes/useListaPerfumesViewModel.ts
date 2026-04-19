import { useEffect, useState } from "react";
import { getAllPerfumes } from "../../peticiones";
import { ICardPerfume } from "../../components/CardPerfume";

interface IPerfumeBackend {
    id: string
    nombre: string
    foto: string
    marca: { nombre: string }
    familiasOlfativas: { nombre: string }[];
}

export const useListPerfumesViewModel = () => {
    const [listaPerfumes, setListaPerfumes] = useState<ICardPerfume[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPerfumes()
            .then((datos: IPerfumeBackend[]) => {
                const perfumesFormateados: ICardPerfume[] = datos.map((p) => ({
                    // Convertimos el id en texto para React
                    id: String(p.id),

                    // La marca es un objeto?
                    // Sí -> Dame el nombre
                    // No -> Pon el texto que venga o aviso de que no ha llegado bien
                    brand: typeof p.marca === 'object' && p.marca !== null
                        ? p.marca.nombre
                        : (p.marca || "Sin marca"),

                    name: p.nombre || "Sin nombre",

                    image: p.foto || "/default.jpg",

                    // Si viene en una lista...
                    olfactoryFamilies: Array.isArray(p.familiasOlfativas)
                        ? p.familiasOlfativas.map((f) => f.nombre) // De cada familia, solo guarda el nombre
                        : [] // Si no hay nada, lista vacía
                }));

                // Guarda la lista en el estado de la página
                setListaPerfumes(perfumesFormateados);
                // Avisa a la página que ya ha terminado de cargar
                setLoading(false);

            });
    }, [])

    return {
        listaPerfumes,
        loading
    }
}