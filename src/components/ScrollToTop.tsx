import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto" // Sin animación
        })
    }, [pathname]); // Se ejecuta en cada cambio de página

    return null; // Porque solo ejecuta lógica, nada visual
}