import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { BRAND } from "../BrandData.ts";
import { IBrand } from "../IBrand";

export const useBrandListViewModel = () => {

    const [brands, setBrands] = useState<IBrand[]>([]);

    useEffect(() => {
        // Aquí se hará la consulta para traer las marcas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBrands(BRAND)
    }, [])

    return{
        brands
    }
}