import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IUser } from "../interfaces/IUsuario";
import { IListas } from "../interfaces/IListas";
import {
  guardarLista,
  quitarListaGuardada,
  estaListaGuardada,
} from "../services/listasGuardadas.services";


interface ListCardProps {
  data: IListas;
  user?: IUser;
  isOwner?: boolean;
  onEdit?: () => void;
}

export const ListaCard = ({ data, user, isOwner = false, onEdit }: ListCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);
  const perfumeImages = (data.perfumes || []).filter(Boolean);
  const userImage = data.pfp || "/user/profile-pic/default-profile.jpg";

  useEffect(() => {
    const load = async () => {
      try {
        if (isOwner) return; // no need when it's your own list
        if (!data?.id) return;

        // data.id is a string ; services expect number
        const id = Number(data.id);
        if (Number.isNaN(id)) return;

        const res = await estaListaGuardada(id);
        const guardada =
          (res as { result?: { guardada?: boolean } })?.result?.guardada ??
          (res as { guardada?: boolean })?.guardada ??
          false;

        setLiked(Boolean(guardada));
      } catch {
        // keep default false
      }
    };

    load();
  }, [data?.id, isOwner]);

  return (
    <div className="card bg-base-100 shadow-sm w-96">
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            {!isOwner && user.rol !== "ADMIN" ? (
              <div
                className="tooltip save"
                data-tip={saving ? "Guardando..." : liked ? "Quitar lista" : "Guardar lista"}
              >
                <button
                  className="btn btn-circle"
                  disabled={saving}
                  onClick={async () => {
                    const nextLiked = !liked;
                    setLiked(nextLiked);
                    setSaving(true);

            try {
              const id = Number(data.id);
              if (Number.isNaN(id)) return;

              if (nextLiked) await guardarLista(id);
              else await quitarListaGuardada(id);
            } catch {
              setLiked(!nextLiked);
            } finally {
              setSaving(false);
            }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={liked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-[1.5em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185v15.17a.75.75 0 0 1-1.08.674L12 18.21l-6.42 3.14a.75.75 0 0 1-1.08-.674V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-6 mb-2 items-center">
          <div className="avatar w-14 shrink-0">
            <div className="w-14 rounded-full">
              <img src={userImage} alt={`Foto de perfil de ${data.nombreUsuario}`} />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="card-title">{data.nombreUsuario}</h2>
          </div>
        </div>

        {data.premium && (
          <img
            src="/user/icons/crown-1.svg"
            alt="Icono premium corona"
            className="absolute top-0.5 left-5 w-8 h-8 -rotate-22"
          />
        )}
        {data.rol === "ADMIN" && (
          <img
            src="/user/icons/admin-icon.svg"
            alt="Icono admin"
            className="absolute top-0.5 left-5 w-8 h-8 -rotate-22"
          />
        )}
        {data.cafe && (
          <img
            src="/user/icons/coffee-cup.svg"
            alt="Icono premium corona"
            className="absolute top-0.5 left-5 w-8 h-8 -rotate-22"
          />
        )}

        <div className="divider h-1 my-0"></div>
        <h2 className="font-semibold">{data.titulo}</h2>
        <div className="divider h-1 my-0"></div>

        <div className="avatar-group flex justify-center -space-x-2">
          {perfumeImages.slice(0, 4).map((perfumeURL, index) => (
            <div className="avatar" key={`${data.id}-${index}`}>
              <div className="w-12">
                <img src={perfumeURL} alt="" />
              </div>
            </div>
          ))}
          {perfumeImages.length > 4 && (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-12">
                <span>+ {perfumeImages.length - 4}</span>
              </div>
            </div>
          )}
        </div>

        <Link to={`/listas/${data.id}`} className="btn btn-neutral hover:hover:btn-accent text-primary-content">
          Ver lista completa
        </Link>
      </div>
    </div>
  );
};

export const ListCard = ListaCard;

