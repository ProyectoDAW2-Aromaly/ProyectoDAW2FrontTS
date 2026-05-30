import { useContext, useEffect, useState } from "react";
import { IVotacion } from "../interfaces/IVotacion"
import { IUser } from "../interfaces/IUsuario";
import { getUsuarioPorId } from "../services/usuarios.services";
import UserContext from "../context/UserContext";

interface ComentarioCardProps {
    comentario: IVotacion;
    abrirEliminar: (id?: number) => void
}

export const ComentarioCard = ({ comentario, abrirEliminar }: ComentarioCardProps) => {
    const userContext = useContext(UserContext);
    const usuarioActual = userContext?.user;

    const [usuarioComentario, setUsuarioComentario] = useState<IUser>();
    const cargarDatos = async () => {
        try {
            const data = await getUsuarioPorId(Number(comentario.id_usuario));
            setUsuarioComentario(data)
        } catch (err) {
            console.error(err);
        }
    }

    const getUserBadge = () => {
        const defaultClassName = "pointer-events-none absolute -top-0.5 -left-0.5 z-10 h-5 w-5 drop-shadow-md"

        switch (usuarioComentario?.rol) {
            case "ADMIN":
                return { src: "/user/icons/admin-icon.svg", alt: "Icono admin", className: defaultClassName }
            case "PREMIUM":
                return { src: "/user/icons/crown-1.svg", alt: "Icono premium corona", className: defaultClassName }
            default:
                return undefined
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarDatos();
    }, []);

    return (
        <div className="card bg-base-100 w-auto" key={comentario.id}>
            <div className="divider m-0"></div>
            <div className="card-body flex flex-col justify-between">
                <div className="flex gap-6 mb-2 items-center">
                    <div className="avatar w-14 shrink-0 relative">
                        <div className="w-14 rounded-full">
                            <img src={usuarioComentario?.pfp ?? "/user/profile-pic/default-profile.jpg"} alt={`Foto de perfil de ${usuarioComentario?.username}`} />
                        </div>
                        {getUserBadge() && <img {...getUserBadge()} />}
                    </div>
                    <div>
                        <h2 className="card-title">{usuarioComentario?.username}</h2>
                        <p>{comentario.valor}</p>
                    </div>
                </div>
                <div className="absolute top-10 right-10 flex gap-2 z-1">
                    {usuarioActual?.rol === "ADMIN" || comentario.id_usuario === usuarioActual?.id ? (
                        <div className="tooltip save" data-tip="Borrar comentario">
                            <button className="btn btn-circle" onClick={() => abrirEliminar(comentario.id)} aria-label="Borrar comentario">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            
        </div>
    )
}