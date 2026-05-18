import { useEffect, useState } from "react";
import { getAllPerfumes, getPerfumesFiltros } from "../../services/perfume.services";
import { IFamilias, INota, IPerfumeBackend, TGenero } from "../../interfaces/IPerfume";

export const useListaPerfumesViewModel = () => {
    const [listaPerfumes, setListaPerfumes] = useState<IPerfumeBackend[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarDatos = () => {
        getAllPerfumes()
            .then((datos: IPerfumeBackend[]) => {
                const perfumesFormateados: IPerfumeBackend[] = datos.map((p) => ({
                    // Convertimos el id en texto para React
                    ...p,

                    // La marca es un objeto?
                    // Sí -> Dame el nombre
                    // No -> Pon el texto que venga o aviso de que no ha llegado bien
                    marca: p.marca ?? { isdarklogo: true, nombre: "Sin marca" },

                    nombre: p.nombre ?? "Sin nombre",

                    foto: p.foto ?? "/default.jpg"
                }));

                // Guarda la lista en el estado de la página
                setListaPerfumes(perfumesFormateados);
                // Avisa a la página que ya ha terminado de cargar
                setLoading(false);

            });
    }

    const aplicarFiltros = (nombre: string, familias: IFamilias[], notas: INota[], genero?: TGenero) => {

        getPerfumesFiltros({
            familias: familias.map(f => f.nombre),
            genero,
            notas: notas.map(n => n.nombre)
        })

    }

    useEffect(() => {
        cargarDatos()
    }, [])

    return {
        listaPerfumes,
        loading,
        aplicarFiltros
    }
}