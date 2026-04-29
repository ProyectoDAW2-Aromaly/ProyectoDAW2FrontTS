import { Link } from "react-router";
import type { IUser } from "../../../servicios/usuarios.services";

interface SeccionComentariosProps {
    user?: IUser;
}

const COMENTARIOS = [
    {
        id: "1",
        nombre: "Axel",
        contenido: "Comentario random de este perfume. No se si deberia poner las estrellas que este usuario ha puesto o dejarlo sin estrellas.",
    },
    {
        id: "2",
        nombre: "Axel",
        contenido: "Comentario random de este perfume. No se si deberia poner las estrellas que este usuario ha puesto o dejarlo sin estrellas.",
    },
];
export const SeccionComentarios = ({ user }: SeccionComentariosProps) => (
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
                                        <img src={user.pfp} alt={`Foto de perfil de ${user.userName}`} />
                                    </div>
                                </div>
                                <p className="mt-2 font-semibold">{user.userName}</p>
                            </div>

                            <div className="w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <textarea className="textarea textarea-md w-full h-22" placeholder="Escribe aqui tu comentario..." />
                                    <button className="btn btn-neutral hover:btn-accent text-primary-content self-end">Comentar</button>
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

        <div className="divider mt-4"></div>
        <div className="flex flex-col gap-2">
            {COMENTARIOS.map((comentario) => (
                <div className="card bg-base-100 w-auto" key={comentario.id}>
                    <div className="card-body flex flex-col justify-between">
                        <div className="flex gap-6 mb-2 items-center">
                            <div className="avatar w-14 shrink-0 relative">
                                <div className="w-14 rounded-full">
                                    <img src="/user/profile-pic/profile1.jpg" alt={`Foto de perfil de ${comentario.nombre}`} />
                                </div>
                                <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute -top-5.5 -left-1 w-8 h-8 -rotate-22" />
                            </div>
                            <div>
                                <h2 className="card-title">{comentario.nombre}</h2>
                                <p>{comentario.contenido}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);