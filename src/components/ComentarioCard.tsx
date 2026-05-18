import { useEffect, useState } from "react";
import { IVotacion } from "../interfaces/IVotacion"
import { IUser } from "../interfaces/IUsuario";
import { getUsuarioPorId } from "../services/usuarios.services";

interface ComentarioCardProps {
    comentario: IVotacion;
}
export const ComentarioCard = ({ comentario }: ComentarioCardProps) => {

    const [usuario, setUsuario] = useState<IUser>()
    const cargarDatos = async () => {
        try {
            const data = await getUsuarioPorId(Number(comentario.id_usuario));
            setUsuario(data)
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarDatos();
    }, [comentario]);

    return (
        <div className="card bg-base-100 w-auto" key={comentario.id}>
            <div className="card-body flex flex-col justify-between">
                <div className="flex gap-6 mb-2 items-center">
                    <div className="avatar w-14 shrink-0 relative">
                        <div className="w-14 rounded-full">
                            <img src={usuario?.pfp} alt={`Foto de perfil de ${usuario?.userName}`} />
                        </div>
                        <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute -top-5.5 -left-1 w-8 h-8 -rotate-22" />
                    </div>
                    <div>
                        <h2 className="card-title">{usuario?.userName}</h2>
                        <p>{comentario.valor}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
