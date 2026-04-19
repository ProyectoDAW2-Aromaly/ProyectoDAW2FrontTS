import { useState } from "react";
import { IList } from "../views/list/IList";

interface IUser {
    userName: string,
    // Profile picture
    pfp: string,
    rol: string
}

interface ListCardProps {
    data: IList;
    user?: IUser;
}

/**
 * Componente para la card de listas de perfumes.
 * @param data Los datos de la lista que se va a mostrar (están así por comodidad).
 * Al colocar el param de esta forma, evitas pasar cada propiedad del objeto por separado.
 * Al poner {data}, evitas tener que sacarlo de otra variable. Ejemplo: data.data.username -> data.username
 * @param user Se le envían los datos del usuario con la sesión iniciada
 * @returns El componente -> Card de la lista de perfumes.
 * @example <ListCard data={list} user={user}/>
 */
export const ListCard = ({ data, user }: ListCardProps ) => {

    const [liked, setLiked] = useState(false);

    // ! FIXME ARREGLAR QUE SI EL USUARIO ES EL MISMO DE LA LISTA, UN BOTÓN DE EDITAR EN VEZ DE GUARDAR

    return <div className="card bg-base-100 shadow-sm w-96">
        <div className="card-body flex flex-col justify-between">
            {user ?
                <div
                    className="tooltip save absolute top-2 right-2 z-50"
                    data-tip={liked ? "Quitar lista" : "Guardar lista"}
                >
                    <button className="btn btn-circle" onClick={() => setLiked(!liked)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={liked ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke={liked ? "currentColor" : "currentColor"}
                            className="size-[1.6em]"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>
                : null
            }

            <div className="flex flex-wrap gap-6 mb-2 items-center">
                <div className="avatar w-14 shrink-0">
                    <div className="w-14 rounded-full">
                        <img src={data.pfp} alt={`Foto de perfil de ${data.username}`} />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="card-title">{data.username}</h2>
                </div>
            </div>

            {data.premium && <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />}
            {data.coffee && <img src="/user/icons/coffee-cup.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />}

            <div className="divider h-1 my-0"></div>
            <h2 className="font-semibold">{data.title}</h2>
            <div className="divider h-1 my-0"></div>

            <div className="avatar-group flex justify-center -space-x-2">
                {data.perfumes.slice(0, 4).map(perfumeURL =>
                    <div className="avatar">
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
            <button className="btn btn-neutral hover:hover:btn-accent text-primary-content">Ver lista completa</button>

        </div>
    </div>
}