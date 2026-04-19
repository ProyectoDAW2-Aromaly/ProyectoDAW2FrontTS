import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { BRAND } from "../BrandData.ts";
import { IBrand } from "../IMarca.ts";

export const useBrandViewModel = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [SelectedBrand, setSelectedBrand] = useState<IBrand>()

    useEffect(() => {
        const search = searchParams.get("name")
        if (search) {
            // Prueba búsqueda de perfume. Aquí va la consulta a backend
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedBrand(BRAND.find(brand => brand.name.toLowerCase() === search.toLowerCase()))
        } else {
            navigate("/not-found") //Para no tener la pantalla en blanco o que no se rompa la página entera
        }
    }, [searchParams])

    return (SelectedBrand);
}