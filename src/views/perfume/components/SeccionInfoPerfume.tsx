import { Link, useNavigate } from "react-router";
import type { IUser } from "../../../services/usuarios.services";
import type { IListaPerfumeOption } from "../../../services/listas.services";
import type { IPerfume } from "../IPerfume";
import { useState } from "react";
import { eliminarPerfume } from "../../../services/perfume.services";
import { ModalConfirmacion } from "../../../components/ModalConfirmacion";

interface SeccionInfoPerfumeProps {
    perfume: IPerfume;
    user?: IUser;
    liked: boolean;
    loadingFavorite?: boolean;
    listasUsuario: IListaPerfumeOption[];
    listasLoading: boolean;
    listasError: string;
    onTogglePerfumeInList: (idLista: number, checked: boolean) => void;
    onToggleLiked: () => void;
    onEditPerfume: (id: string) => void;
}

export const SeccionInfoPerfume = ({
    perfume,
    user,
    liked,
    loadingFavorite,
    listasUsuario,
    listasLoading,
    listasError,
    onTogglePerfumeInList,
    onToggleLiked,
    onEditPerfume,
}: SeccionInfoPerfumeProps) => {
    const navigate = useNavigate();

    const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
    const [loadingEliminar, setLoadingEliminar] = useState(false);

    const handleEliminarPerfume = async (id: string) => {
        setIdAEliminar(id);
        const modal = document.getElementById("modal-eliminar-perfume") as HTMLDialogElement;
        modal?.showModal();
    };

    const confirmarEliminar = async () => {
        if (!idAEliminar) return;

        try {
            setLoadingEliminar(true);
            await eliminarPerfume(idAEliminar);

            const modal = document.getElementById("modal-eliminar-perfume") as HTMLDialogElement;
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
        const modal = document.getElementById("modal-eliminar-perfume") as HTMLDialogElement;
        modal?.close();

        setIdAEliminar(null);
    }


    return (
        <div className="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row">
            <figure className="w-full md:w-4xl h-auto flex-3">
                <img src={perfume.imagen.src} alt={perfume.imagen.alt} />
            </figure>
            <div className="card-body items-start flex-5">
                <h1 className="card-title ml-2">{perfume.nombre}</h1>
                <Link to={`/marca/${encodeURIComponent(perfume?.marca?.nombre ?? "")}`} className="btn btn-ghost bg-[#FFF7ED] self-start p-2 h-auto min-h-0">
                    <figure className="flex items-center justify-center rounded-none">
                        <img
                            src={perfume.logo.src}
                            alt={perfume.logo.alt}
                            style={{ width: "100px", height: "auto", maxHeight: "80px" }}
                            className="object-contain"
                        />
                    </figure>
                </Link>

                <div className="absolute top-2 right-2 flex gap-2 z-40">
                    {user?.rol === "ADMIN" ? (
                        <div className="tooltip save" data-tip="Borrar perfume">
                            <button className="btn btn-circle" onClick={() => handleEliminarPerfume(perfume.id)} aria-label="Borrar perfume">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ) : null}

                    {user?.rol === "ADMIN" ? (
                        <div className="tooltip save" data-tip="Editar perfume">
                            <button className="btn btn-circle" onClick={() => onEditPerfume(perfume.id)} aria-label="Editar perfume">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </div>
                    ) : null}

                    {user ? (
                        <div className="dropdown dropdown-end tooltip save" data-tip="Guardar en lista">
                            <label tabIndex={0} className="btn btn-circle" aria-label="Guardar en lista">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-[1.6em]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </label>
                            <div tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-10 w-64 p-3 shadow-sm mt-2">
                                <h4 className="font-semibold mb-2">Guardar en lista</h4>

                                {listasLoading && <p className="text-sm opacity-70">Cargando listas...</p>}
                                {listasError && <p className="text-sm text-error mb-2">{listasError}</p>}
                                {!listasLoading && listasUsuario.length === 0 && (
                                    <p className="text-sm opacity-70">No tienes listas creadas.</p>
                                )}

                                <ul className="space-y-2 max-h-52 overflow-y-auto">
                                    {listasUsuario.map((lista) => (
                                        <li className="flex items-center justify-between gap-3" key={lista.id}>
                                            <div>
                                                <p className="font-medium">{lista.nombre}</p>
                                                <p className="text-xs opacity-60">
                                                    {lista.totalPerfumes} perfumes
                                                </p>
                                            </div>

                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={lista.contienePerfume}
                                                onChange={(e) => onTogglePerfumeInList(lista.id, e.target.checked)}
                                            />
                                        </li>
                                    ))}
                                </ul>

                                <div className="divider my-2"></div>
                                <Link to="/perfil" className="btn btn-sm btn-neutral w-full">
                                    Crear o gestionar listas
                                </Link>
                            </div>
                        </div>
                    ) : null}

                    {user ? (
                        <div className="tooltip save" data-tip={liked ? "Quitar de favoritos" : "Guardar en favoritos"}>
                            <button
                                className="btn btn-circle"
                                onClick={onToggleLiked}
                                aria-label="Alternar favorito"
                                disabled={loadingFavorite}
                            >
                                {loadingFavorite ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-[1.6em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className="divider">Descripcion</div>
                <p>
                    {perfume.descripcion}
                    <br />
                    <br />
                </p>
                <div className="divider">Informacion general</div>
                <h5>
                    <span>Familia olfativa:</span>
                    {perfume.familias.map((familia, index) => (
                        <span key={`${familia}-${index}`} className="badge badge-sm badge-soft badge-neutral ml-2">{familia}</span>
                    ))}
                </h5>
                <h5 className="flex items-center">
                    Genero
                    <figure>
                        <img src={perfume.genero} alt="Icono de genero" className="w-5 ml-2 icon-theme-aware" />
                    </figure>
                </h5>
                <h5>
                    <span>Perfumista:</span>
                    {perfume.perfumista.map((perfumista, index) => (
                        <Link
                            key={`${perfumista.id ?? perfumista.nombre}-${index}`}
                            className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent"
                            to={`/perfumista/${perfumista.id}`}
                        >
                            {perfumista.nombre}
                        </Link>
                    ))}
                </h5>
                <h5>Fecha de lanzamiento: {perfume.yearSalida}</h5>
                {perfume.coleccion ? (
                    <h5>
                        Coleccion:
                        <div className="badge badge-sm badge-soft badge-neutral ml-2">{perfume.coleccion}</div>
                    </h5>
                ) : null}
            </div>
            <ModalConfirmacion
                id="modal-eliminar-perfume"
                titulo="Eliminar perfume"
                mensaje="¿Estás seguro/a de querer eliminar el perfume permanentemente?"
                onCancelar={cancelarEliminar}
                onConfirmar={confirmarEliminar}
                loading={loadingEliminar}
            />
        </div>
    );
}
