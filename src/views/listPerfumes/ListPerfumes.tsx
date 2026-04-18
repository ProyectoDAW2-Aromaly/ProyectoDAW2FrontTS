import { useEffect, useState } from "react";
import { CardPerfume, ICardPerfume } from "../../components/CardPerfume";
import { FilterPanel } from "../../components/FilterPanel";
import Pagination from "../../components/Pagination";
import { getAllPerfumes } from "../../peticiones";
// import { useListPerfumesViewModel } from "./useListPerfumesViewModel";

interface IFamiliaBackend {
    nombre: string;
}

interface IMarcaBackend {
    nombre: string;
    isDarkLogo?: boolean;
    foto?: string;
}

interface IPerfumeBackend {
    id: number | string;
    nombre: string;
    foto: string;
    marca: IMarcaBackend | string; // Puede ser el objeto que montas en el back o un string
    familiasOlfativas?: IFamiliaBackend[];
}

const ListPerfumes = () => {

    const [perfumes, setPerfumes] = useState<ICardPerfume[]>([]);
    const [loading, setLoading] = useState(true);

    // Solo se ejecuta una vez al abrir la página
    useEffect(() => {
        getAllPerfumes()
            // Cuando lleguen los datos del servidor... (datos -> Lista que viene del back)
            .then((datos: IPerfumeBackend[]) => {
                console.log("Datos recibidos del back:", datos);
                // Creamos una lista nueva
                const perfumesFormateados: ICardPerfume[] = datos.map((p) => ({
                    // Convertimos el id en texto para React
                    id: String(p.id),

                    // La marca es un objeto?
                    // Sí -> Dame el nombre
                    // No -> Pon el texto que venga o aviso de que no ha llegado bien
                    brand: typeof p.marca === 'object' && p.marca !== null
                        ? p.marca.nombre
                        : (p.marca || "Sin marca"),

                    // En el back viene como nombre, aquí como name
                    name: p.nombre || "Sin nombre",
                    // Lo mismo aquí
                    // TODO Aún no funciona esto, no tengo S3
                    image: p.foto || "/default.jpg",

                    // Viene en una lista?
                    olfactoryFamilies: Array.isArray(p.familiasOlfativas)
                        ? p.familiasOlfativas.map((f) => f.nombre) // De cada familia, solo guarda el nombre
                        : [] // Si no hay nada, lista vacía
                }));

                // Guarda la lista en el estado de la página
                setPerfumes(perfumesFormateados);
                // Avisa a la página que ya ha terminado de cargar
                setLoading(false);
            })
            .catch(error => {
                console.error("No se han podido cargar los perfumes:", error);
                setLoading(false); // Deja de cargar aunque haya error, para que no se quede en bucle
            });
    }, []); // Este array vacío quiere decir "Solo haz esto al cargar la página por primera vez."

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
            <h1 className="text-4xl mb-5">TODOS LOS PERFUMES</h1>

            <FilterPanel />

            <div className="flex flex-wrap gap-12 mb-20" >

                {perfumes.map(list =>
                    <CardPerfume data={list} key={list.id} />
                )}

            </div>
            {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
            <Pagination currentPage={1} itemsPerPage={12} totalItems={perfumes.length} handlePageChange={(page) => console.log("Ir a página:", page)} />
        </div>
    )
}

export default ListPerfumes;