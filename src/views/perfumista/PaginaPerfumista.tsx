import { useContext } from "react";
import { useNavigate } from "react-router";
import { ICardPerfume, PerfumeCard } from "../../components/PerfumeCard";
import { FiltroPanel } from "../../components/FiltroPanel";
import Paginacion from "../../components/Paginacion";
import UserContext from "../../context/UserContext";
import { usePaginacion } from "../../hooks/usePaginacion";
import { usePerfumistaViewModel } from "./usePerfumistaViewModel";

const PerfumerPage = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext)?.user;

    const irEditarPerfumista = (perfumistaId: string) => {
        navigate(`/perfumista/formulario?editar=${perfumistaId}`);
    };

    const { perfumista, perfumes, loading, error } = usePerfumistaViewModel();
    const perfumesPorPagina = 12;

    const {
        pagina,
        setPagina,
        itemsTotales,
        itemsPaginacion: perfumesVisibles
    } = usePaginacion<ICardPerfume>(perfumes, perfumesPorPagina);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    if (error) return <p>{error}</p>;
    if (!perfumista) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25">
            <div className="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row mt-30">
                <figure className="w-full md:w-96 h-96 overflow-hidden shrink-0">
                    <img
                        src={perfumista.imagen?.src}
                        alt={perfumista.imagen?.alt}
                    />
                </figure>

                <div className="card-body items-start flex-5">
                    <h1 className="card-title ml-2">{perfumista.nombre}</h1>

                    <div className="absolute top-2 right-2 flex gap-2 z-40">
                        {user?.rol === "ADMIN" ? (
                            <div className="tooltip save" data-tip="Editar perfumista">
                                <button className="btn btn-circle" onClick={() => irEditarPerfumista(perfumista.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="divider">Descripcion</div>
                    <p>
                        {perfumista.descripcion?.map((descripcion) => (
                            <span key={descripcion}>
                                {descripcion}
                                <br />
                                <br />
                            </span>
                        ))}
                    </p>
                </div>
            </div>

            <FiltroPanel />

            <h1 className="text-2xl text-center mb-10 mt-10">
                PERFUMES DE {perfumista.nombre?.toUpperCase() ?? ""}
            </h1>

            <div className="flex flex-wrap gap-12 mb-20">
                {perfumesVisibles.map((perfume: ICardPerfume) => (
                    <PerfumeCard data={perfume} key={perfume.id} />
                ))}
            </div>

            <Paginacion
                paginaActual={pagina}
                itemsPorPagina={perfumesPorPagina}
                totalItems={itemsTotales}
                handleCambiarPagina={setPagina}
            />
        </div>
    );
};

export default PerfumerPage;
