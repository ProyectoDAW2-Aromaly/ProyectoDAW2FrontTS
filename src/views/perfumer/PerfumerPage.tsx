import { useNavigate } from "react-router";
import { PerfumeCard, type ICardPerfume } from "../../components/PerfumeCard";
import { FiltroPanel } from "../../components/FiltroPanel";
import Paginacion from "../../components/Paginacion";
import { usePerfumerViewModel } from "./usePerfumerViewModel";
import type { IUser } from "../../servicios/usuarios.services";

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
];

interface IPerfumerPage {
    user?: IUser;
}

const PerfumerPage = ({ user }: IPerfumerPage) => {
    const navigate = useNavigate();

    const goToEditPerfumer = (perfumerId: string) => {
        navigate(`/perfumer/form?edit=${perfumerId}`);
    };

    const selectedPerfumer = usePerfumerViewModel();

    if (selectedPerfumer === undefined) return null;

    return (
        <>
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

                        <div className="absolute top-2 right-2 flex gap-2 z-40">
                            {user?.rol === "ADMIN" ? (
                                <div className="tooltip save" data-tip="Editar perfume">
                                    <button className="btn btn-circle" onClick={() => goToEditPerfumer(selectedPerfumer.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </div>
                            ) : null}
                        </div>

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

                <FiltroPanel />

                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES DE {selectedPerfumer.name.toUpperCase()}</h1>
                <div className="flex flex-wrap gap-12 mb-20">
                    {mockedPerfumes.map(list =>
                        <PerfumeCard data={list} key={list.id} />
                    )}
                </div>
                <Paginacion currentPage={3} itemsPerPage={12} totalItems={500} handlePageChange={console.log} />
            </div>
        </>
    );
};

export default PerfumerPage;
