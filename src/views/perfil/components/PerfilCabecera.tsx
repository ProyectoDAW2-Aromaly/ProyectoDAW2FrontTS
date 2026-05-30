import { IUserProfile } from "../../../interfaces/IPerfil";

interface Props {
    usuario: IUserProfile;
    mostrarEditar: boolean;
    onEditarPerfil: () => void;
}

export default function PerfilCabecera({ usuario, mostrarEditar, onEditarPerfil }: Props) {
    return (
        <div className="card bg-base-100 shadow-sm mb-8">
            <div className="card-body">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="relative shrink-0">
                        <div className="avatar">
                            <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-base-content/10">
                                <img
                                    src={usuario?.pfp || "/user/profile-pic/default-profile.jpg"}
                                    alt={`Foto de ${usuario?.userName || "usuario"}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        {(usuario?.rol === "PREMIUM" || usuario?.rol === "ADMIN") && (
                            <img
                                src={usuario?.rol === "ADMIN" ? "/user/icons/admin-icon.svg" : "/user/icons/crown-1.svg"}
                                alt={usuario?.rol === "ADMIN" ? "Icono admin" : "Icono premium corona"}
                                className="pointer-events-none absolute -bottom-0.5 -right-0.5 z-10 h-8 w-8 drop-shadow-md"
                            />
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold">{usuario?.userName}</h1>
                        <p className="text-sm opacity-70">{usuario?.email}</p>
                        <div className="badge badge-xs badge-soft badge-neutral mt-2">{usuario?.rol}</div>
                        <p className="mt-4 whitespace-pre-line">
                            {usuario?.descripcion || "Este usuario no tiene descripcion."}
                        </p>
                    </div>

                    {!mostrarEditar && (
                        <button
                            className="btn btn-neutral hover:hover:btn-accent text-primary-content"
                            onClick={onEditarPerfil}
                        >
                            Editar perfil
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}