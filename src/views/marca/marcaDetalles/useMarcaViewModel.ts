import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { BRAND } from "../BrandData.ts";
import { IMarca } from "../IMarca.ts";

export const useMarcaViewModel = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<IMarca>()

    useEffect(() => {
        const busqueda = searchParams.get("name")
        if (busqueda) {
            // Prueba búsqueda de perfume. Aquí va la consulta a backend
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMarcaSeleccionada(BRAND.find(marca => marca.nombre.toLowerCase() === busqueda.toLowerCase()))
        } else {
            navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
        }
    }, [navigate, searchParams])

    return (marcaSeleccionada);
}