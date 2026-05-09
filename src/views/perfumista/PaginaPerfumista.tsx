import { useNavigate } from "react-router"
import { ICardPerfume, PerfumeCard } from "../../components/PerfumeCard"
import { FiltroPanel } from "../../components/FiltroPanel"
import Paginacion from "../../components/Paginacion"
import { usePerfumistaViewModel } from "./usePerfumistaViewModel"
import { usePaginacion } from "../../hooks/usePaginacion"
import { useContext, useState } from "react"
import UserContext from "../../context/UserContext"
import { eliminarPerfumista } from "../../services/perfumista.services"
import { ModalConfirmacion } from "../../components/ModalConfirmacion"

const PaginaPerfumista = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user ?? undefined;
    const navigate = useNavigate();

    const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
    const [loadingEliminar, setLoadingEliminar] = useState(false);

    const handleEliminarPerfumista = async (id: string) => {
        setIdAEliminar(id);
        const modal = document.getElementById("modal-eliminar-perfumista") as HTMLDialogElement;
        modal?.showModal();
    };

    const confirmarEliminar = async () => {
        if (!idAEliminar) return;

        try {
            setLoadingEliminar(true);
            await eliminarPerfumista(idAEliminar);

            const modal = document.getElementById("modal-eliminar-perfumista") as HTMLDialogElement;
            modal?.close();
            
            setIdAEliminar(null);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEliminar(false);
        }
    }

    const cancelarEliminar = () => {
        const modal = document.getElementById("modal-eliminar-perfumista") as HTMLDialogElement;
        modal?.close();

        setIdAEliminar(null);
    }

    const irEditarPerfumista = (perfumistaId: string) => {
        navigate(`/perfumista/formulario?editar=${perfumistaId}`);
    }

    const { perfumista, perfumes, loading, error } = usePerfumistaViewModel()
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
    if (error) return <p>{error}</p>
    if (!perfumista) return null;

    return (
        <>
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

                        {/* TOOLTIPS */}
                        <div className="absolute top-2 right-2 flex gap-2 z-40">

                            {/* EDITAR PERFUME -> ADMIN*/}
                            {user?.rol === "ADMIN" ? (
                                <div className="tooltip save" data-tip="Borrar perfumista">
                                    <button className="btn btn-circle" onClick={() => handleEliminarPerfumista(perfumista.id)} aria-label="Borrar perfumista">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                </div>
                            ) : null}

                            {user?.rol === "ADMIN" ? (
                                <div className="tooltip save" data-tip="Editar perfume">
                                    <button className="btn btn-circle" onClick={() => irEditarPerfumista(perfumista.id)} aria-label="Editar perfume">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </div>
                            ) : null}

                        </div>

                        <div className="divider">Descripción</div>
                        <p>{perfumista.descripcion?.map(des =>
                            <span key={des}>
                                {des}
                                <br />
                                <br />
                            </span>
                        )}
                        </p>

                    </div>
                </div>

                <FiltroPanel />

                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES DE {perfumista.nombre?.toUpperCase() ?? ""}</h1>
                <div className="flex flex-wrap gap-12 mb-20" >

                    {perfumesVisibles.map((perfume: ICardPerfume) =>
                        <PerfumeCard data={perfume} key={perfume.id} />
                    )}

                </div>
                <Paginacion
                    paginaActual={pagina}
                    itemsPorPagina={perfumesPorPagina}
                    totalItems={itemsTotales}
                    handleCambiarPagina={setPagina}
                />
                <ModalConfirmacion
                    id="modal-eliminar-perfumista"
                    titulo="Eliminar perfumista"
                    mensaje="¿Estás seguro/a de querer eliminar el perfumista permanentemente?"
                    onCancelar={cancelarEliminar}
                    onConfirmar={confirmarEliminar}
                    loading={loadingEliminar}
                />
            </div>
        </>
    )
}

export default PaginaPerfumista;