import Pagination from "../../../components/Pagination"
import BrandCard from "../../../components/BrandCard";
import { useBrandViewModel } from "./useBrandViewModel";
import { CardPerfume, ICardPerfume } from "../../../components/CardPerfume";
import { FilterPanel } from "../../../components/FilterPanel";

const BrandPage = () => {
    // const navigate = useNavigate();

    // const goToBrand = (brandName: string) => {
    //     navigate(`/brands?name=${brandName}`);
    // }

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
            id: "ValentinoID1",
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
            id: "EldoID1",
            name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            brand: "Etat Libre D'Orange",
            image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            olfactoryFamilies: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId1",
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
            id: "ValentinoID2",
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
            id: "EldoID2",
            name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            brand: "Etat Libre D'Orange",
            image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            olfactoryFamilies: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId2",
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
            id: "ValentinoID3",
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
            id: "EldoID3",
            name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
            brand: "Etat Libre D'Orange",
            image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            olfactoryFamilies: [
                "Amaderado",
                "floral",
            ]
        },
        {
            id: "LiraId3",
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

    const selectedBrand = useBrandViewModel();

    return (
        <>

            <div className="mx-auto max-w-7xl px-4 mt-25 flex flex-col items-center">

                <figure className="w-60 h-60 flex items-center justify-center">
                    <img
                        src={selectedBrand?.image?.src}
                        alt={selectedBrand?.image?.alt}
                    />
                </figure>

                <FilterPanel/>

                <div className="flex flex-wrap gap-12 mb-20" >

                    {mockedPerfumes.map(list =>
                        <CardPerfume data={list} key={list.id} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Pagination currentPage={3} itemsPerPage={12} totalItems={500} handlePageChange={console.log} />
            </div>
        </>
    )
}

export default BrandPage;