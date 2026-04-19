import Paginacion from "../../../components/Paginacion"
import { useMarcaViewModel } from "./useMarcaViewModel";
import { PerfumeCard, ICardPerfume } from "../../../components/PerfumeCard";
import { FiltroPanel } from "../../../components/FiltroPanel";

const PaginaMarca = () => {

    const mockedPerfumes: ICardPerfume[] = [
        {
            id: "ValentinoID",
            nombre: "Born in Roma Intense Donna",
            marca: "Valentino",
            foto: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "EldoID",
            nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            marca: "Etat Libre D'Orange",
            foto: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            familiasOlfativas: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId",
            nombre: "Lira",
            marca: "Xerjoff",
            foto: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "ValentinoID1",
            nombre: "Born in Roma Intense Donna",
            marca: "Valentino",
            foto: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "EldoID1",
            nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            marca: "Etat Libre D'Orange",
            foto: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            familiasOlfativas: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId1",
            nombre: "Lira",
            marca: "Xerjoff",
            foto: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "ValentinoID2",
            nombre: "Born in Roma Intense Donna",
            marca: "Valentino",
            foto: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "EldoID2",
            nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            marca: "Etat Libre D'Orange",
            foto: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            familiasOlfativas: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId2",
            nombre: "Lira",
            marca: "Xerjoff",
            foto: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "ValentinoID3",
            nombre: "Born in Roma Intense Donna",
            marca: "Valentino",
            foto: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
        {
            id: "EldoID3",
            nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            marca: "Etat Libre D'Orange",
            foto: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            familiasOlfativas: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId3",
            nombre: "Lira",
            marca: "Xerjoff",
            foto: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            familiasOlfativas: [
                "Oriental",
                "floral",
                "Gourmand"
            ]
        },
    ]

    const marcaSeleccionada = useMarcaViewModel();

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">
                <div className="w-full h-60 dark:bg-[#FFF7ED] flex items-center justify-center rounded-lg">
                    <figure className="w-60 h-60 flex items-center justify-center rounded-lg">
                        <img
                            src={marcaSeleccionada?.imagen?.src}
                            alt={marcaSeleccionada?.imagen?.alt}
                        />
                    </figure>
                </div>
                
                <FiltroPanel/>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {mockedPerfumes.map(lista =>
                        <PerfumeCard data={lista} key={lista.id} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Paginacion paginaActual={3} itemsPorPagina={12} totalItems={500} handleCambiarPagina={console.log} />
            </div>
        </>
    )
}

export default PaginaMarca;