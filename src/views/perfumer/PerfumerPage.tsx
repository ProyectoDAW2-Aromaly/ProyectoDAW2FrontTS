import { CardPerfume, type ICardPerfume } from "../../components/CardPerfume"
import { FilterPanel } from "../../components/FilterPanel"
import Pagination from "../../components/Pagination"
import { usePerfumerViewModel } from "./usePerfumerViewModel"

const mockedPerfumes: ICardPerfume[] = [
    {
        id: "ValentinoID",
        name: "Born in Roma Intense Donna",
        brand: "Valentino",
        image: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "EldoID",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        brand: "Etat Libre D'Orange",
        image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        olfactoryFamilies: [
            "Amaderado",
            "floral",
        ]
    },
    {
        id: "LiraId",
        name: "Lira",
        brand: "Xerjoff",
        image: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "ValentinoID",
        name: "Born in Roma Intense Donna",
        brand: "Valentino",
        image: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "EldoID",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        brand: "Etat Libre D'Orange",
        image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        olfactoryFamilies: [
            "Amaderado",
            "floral",
        ]
    },
    {
        id: "LiraId",
        name: "Lira",
        brand: "Xerjoff",
        image: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "ValentinoID",
        name: "Born in Roma Intense Donna",
        brand: "Valentino",
        image: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "EldoID",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        brand: "Etat Libre D'Orange",
        image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        olfactoryFamilies: [
            "Amaderado",
            "floral",
        ]
    },
    {
        id: "LiraId",
        name: "Lira",
        brand: "Xerjoff",
        image: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "ValentinoID",
        name: "Born in Roma Intense Donna",
        brand: "Valentino",
        image: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "EldoID",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        brand: "Etat Libre D'Orange",
        image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        olfactoryFamilies: [
            "Amaderado",
            "floral",
        ]
    },
    {
        id: "LiraId",
        name: "Lira",
        brand: "Xerjoff",
        image: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
]

const PerfumerPage = () => {

    const selectedPerfumer = usePerfumerViewModel()

    if (selectedPerfumer === undefined) return null

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25">
            <div className="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row mt-30">
                <figure className="w-full md:w-96 h-96 overflow-hidden shrink-0">
                    <img
                        src={selectedPerfumer.image?.src}
                        alt={selectedPerfumer.image?.alt}
                    />
                </figure>
                <div className="card-body items-start flex-5">
                    <h1 className="card-title ml-2">{selectedPerfumer.name}</h1>

                    <div className="divider">Descripción</div>
                    <p>{selectedPerfumer.description?.map(description =>
                        <span key={description}>
                            {description}
                            <br />
                            <br />
                        </span>
                    )}
                    </p>

                </div>
            </div>

            <FilterPanel />

            <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES DE {selectedPerfumer.name.toUpperCase()}</h1>
            <div className="flex flex-wrap gap-12 mb-20" >

                {mockedPerfumes.map(list =>
                    <CardPerfume data={list} key={list.id} />
                )}

            </div>
            <Pagination currentPage={1} itemsPerPage={12} totalItems={500} handlePageChange={() => null}/>
        </div>
    )
}

export default PerfumerPage;