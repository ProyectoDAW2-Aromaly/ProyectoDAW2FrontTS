import { Link, useNavigate } from "react-router";
import { IUser } from "../../../interfaces/IUsuario";
import { IVotacion } from "../../../interfaces/IVotacion";
import { ComentarioCard } from "../../../components/ComentarioCard";
import { useState } from "react";
import { ModalConfirmacion } from "../../../components/ModalConfirmacion";
import { eliminarComentario } from "../../../services/comentario.services";

export interface SeccionComentariosProps {
    user?: IUser;
    onCrearComentario: (comentario: string) => Promise<void>;
    comentarios: IVotacion[];
}

export const SeccionComentarios = ({ user, onCrearComentario, comentarios }: SeccionComentariosProps) => {
    const navigate = useNavigate();
    const [comentario, setComentario] = useState("")
    const [error, setError] = useState(false)
    const [idAEliminar, setIdAEliminar] = useState<number>();
    const [loadingEliminar, setLoadingEliminar] = useState(false);

    const abrirEliminar = async (id?: number) => {
        setIdAEliminar(id);
        if (id !== undefined) {
            const modal = document.getElementById("modal-eliminar-comentario") as HTMLDialogElement;
            modal?.showModal();
        }
    }

    const confirmarEliminar = async () => {
        if (!idAEliminar) return;

        try {
            setLoadingEliminar(true);
            if (idAEliminar === undefined) throw Error("Comentario no encontrado.");
            await eliminarComentario(idAEliminar);

            const modal = document.getElementById("modal-eliminar-comentario") as HTMLDialogElement;
            modal?.close();

            setIdAEliminar(undefined);
            navigate(0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEliminar(false);
        }
    }

    const cancelarEliminar = () => {
        const modal = document.getElementById("modal-eliminar-comentario") as HTMLDialogElement;
        modal?.close();

        setIdAEliminar(undefined);
    }

    return (
        <>
            <h1 className="text-2xl text-center mb-10 mt-10">COMENTARIOS</h1>
            <div className="divider mt-10">Añade un comentario</div>
            <div className="flex flex-col">
                <div className="card bg-base-100 w-full">
                    {user ? (
                        <div className="card-body">
                            <div className="flex gap-6 mb-2 items-start w-full">
                                <div className="flex flex-col items-center">
                                    <div className="avatar w-14 shrink-0">
                                        <div className="w-14 rounded-full">
                                            <img src={user.pfp} alt={`Foto de perfil de ${user.username}`} />
                                        </div>
                                    </div>
                                    <p className="mt-2 font-semibold">{user.username}</p>
                                </div>

                                <div className="w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <textarea
                                            className="textarea textarea-md w-full h-22"
                                            placeholder="Escribe aquí tu comentario..."
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                        />
                                        {error && <span className="text-error text-xs">El comentario no puede estar vacío.</span>}
                                        <button className="btn btn-neutral hover:btn-accent text-primary-content self-end" onClick={() => {
                                            if (comentario.trim() === "")
                                                setError(true)
                                            else {
                                                onCrearComentario(comentario)
                                                    .then(() => {
                                                        setComentario("")
                                                        setError(false)
                                                    })
                                            }
                                        }}>Comentar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card-body">
                            <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                <h1 className="text-center text-lg">
                                    Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">Registrarte</Link>
                                    &nbsp;o&nbsp;
                                    <Link className="link hover:link-accent hover:no-underline" to="/login">Iniciar sesión</Link>
                                    &nbsp;para dejar un comentario.
                                </h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-10">
                {comentarios.map((comentario) => (
                    <ComentarioCard key={comentario.id} comentario={comentario} abrirEliminar={abrirEliminar} />
                ))}
            </div>
            <ModalConfirmacion
                id="modal-eliminar-comentario"
                titulo="Eliminar comentario"
                mensaje="¿Estás seguro/a de querer eliminar el comentario permanentemente?"
                onCancelar={cancelarEliminar}
                onConfirmar={confirmarEliminar}
                loading={loadingEliminar}
            />
        </>
    )
};