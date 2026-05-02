import { useNavigate } from "react-router"
import { PerfumeCard } from "../../components/PerfumeCard"
import { FiltroPanel } from "../../components/FiltroPanel"
import Paginacion from "../../components/Paginacion"
import { usePerfumistaViewModel } from "./usePerfumistaViewModel"
import type { IUser } from "../../App"

const tempUser: IUser = {
    userName: "Jakob",
    pfp: "/user/profile-pic/profile2.jpg",
    rol: "admin",
    token: "$2b$10$uSP8eixlaZmqCltuNXVzqu4zRIBAjyz/zHEuAPX.tn73O4d9IB7Sm"
}

interface IPerfumerPage {
    user?: IUser,
    // * Definimos que se le pasará una función que reciba un usuario. Devuelve void
    setUser: (val?: IUser) => void
}

const PerfumerPage = ({ user, setUser }: IPerfumerPage) => {
    const navigate = useNavigate();

    const irEditarPerfumista = (perfumistaId: string) => {
        navigate(`/perfumista/formulario?editar=${perfumistaId}`);
    }

    const { perfumista, perfumes, loading, error} = usePerfumistaViewModel()

    // if (perfumistaSeleccionado === undefined) return null

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }
    if(error) return <p>{error}</p>
    if (!perfumista) return null;

    return (
        <>
            {/* Botones de prueba */}
            <div className="relative mt-15">
                <div className="absolute top-2 left-2 flex gap-2 z-30">
                    <button onClick={() => setUser(tempUser)} className="btn btn-xs">
                        Usuario
                    </button>
                    <button onClick={() => setUser(undefined)} className="btn btn-xs">
                        No usuario
                    </button>
                </div>
            </div>
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
                            {user?.rol === "admin" ? <div className="tooltip save" data-tip="Editar perfume">
                                <button className="btn btn-circle" onClick={() => irEditarPerfumista(perfumista.id)}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>

                                </button>
                            </div> : null}

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

                    {perfumes.map(perfume =>
                        <PerfumeCard data={perfume} key={perfume.id} />
                    )}

                </div>
                {/* En el handlePageChange es llamada a back con limit. El currentPage es un estado con useState. */}
                <Paginacion paginaActual={3} itemsPorPagina={12} totalItems={500} handleCambiarPagina={console.log} />
            </div>
        </>
    )
}

export default PerfumerPage;