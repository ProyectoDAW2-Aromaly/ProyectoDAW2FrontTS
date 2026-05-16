import { useState } from "react";
import { Link } from "react-router";
import { IList } from "../interfaces/IListas";

interface IUser {
    userName: string,
    pfp: string,
    rol: string
}

interface ListCardProps {
    data: IList;
    user?: IUser;
    isOwner?: boolean;
    onEdit?: () => void;
}

export const ListaCard = ({ data, user, isOwner = false, onEdit }: ListCardProps ) => {
    const [liked, setLiked] = useState(false);

    return <div className="card bg-base-100 shadow-sm w-96">
        <div className="card-body flex flex-col justify-between">
            {user ? (
                <div className="absolute top-2 right-2 z-50 flex gap-2">
                    {isOwner && onEdit ? (
                        <div className="tooltip save" data-tip="Editar lista">
                            <button className="btn btn-circle" onClick={onEdit}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="size-[1.4em]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </div>
                    ) : null}

                    {!isOwner ? (
                        <div
                            className="tooltip save"
                            data-tip={liked ? "Quitar lista" : "Guardar lista"}
                        >
                            <button className="btn btn-circle" onClick={() => setLiked(!liked)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={liked ? "currentColor" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="size-[1.6em]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="flex flex-wrap gap-6 mb-2 items-center">
                <div className="avatar w-14 shrink-0">
                    <div className="w-14 rounded-full">
                        <img src={data.pfp} alt={`Foto de perfil de ${data.nombreUsuario}`} />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="card-title">{data.nombreUsuario}</h2>
                </div>
            </div>

            {data.premium && <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />}
            {data.cafe && <img src="/user/icons/coffee-cup.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />}

            <div className="divider h-1 my-0"></div>
            <h2 className="font-semibold">{data.titulo}</h2>
            <div className="divider h-1 my-0"></div>

            <div className="avatar-group flex justify-center -space-x-2">
                {data.perfumes.slice(0, 4).map((perfumeURL, index) =>
                    <div className="avatar" key={`${data.id}-${index}`}>
                        <div className="w-12">
                            <img src={perfumeURL} />
                        </div>
                    </div>
                )}
                {data.perfumes.length > 4 && <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-12">
                        <span>+ {data.perfumes.length - 4}</span>
                    </div>
                </div>}
            </div>
            <Link to={`/listas/${data.id}`} className="btn btn-neutral hover:hover:btn-accent text-primary-content">
                Ver lista completa
            </Link>

        </div>
    </div>
}

export const ListCard = ListaCard
