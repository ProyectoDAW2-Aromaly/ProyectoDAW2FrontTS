import { Link } from "react-router";
import { IUser } from "../../../interfaces/IUsuario";
import { IVotacion } from "../../../interfaces/IVotacion";
import { ComentarioCard } from "../../../components/ComentarioCard";

export interface SeccionComentariosProps {
    user?: IUser;
    comentario: string;
    setComentario: (value: string) => void;
    onCrearComentario: () => void | Promise<void>;
    comentarios: IVotacion[];
}

export const SeccionComentarios = ({ user, comentario, setComentario, onCrearComentario, comentarios }: SeccionComentariosProps) => (
    <>
        <h1 className="text-2xl text-center mb-10 mt-10">COMENTARIOS</h1>
        <div className="divider mt-10">Anade un comentario</div>
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
                                        placeholder="Escribe aqui tu comentario..."
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                    />
                                    <button className="btn btn-neutral hover:btn-accent text-primary-content self-end" onClick={onCrearComentario}>Comentar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card-body">
                        <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                            <h1 className="text-center text-lg">
                                Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">registrarte</Link>
                                &nbsp;o&nbsp;
                                <Link className="link hover:link-accent hover:no-underline" to="/login">iniciar sesion</Link>
                                &nbsp;para dejar un comentario.
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="flex flex-col gap-2 mb-10">
            {comentarios.map((comentario) => (
                <ComentarioCard key={comentario.id} comentario={comentario}/>
            ))}
        </div>
    </>
);
