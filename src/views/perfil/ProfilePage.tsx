import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ListCard } from "../../components/ListCard";
import { CardPerfume } from "../../components/CardPerfume";
import UserContext from "../../context/UserContext";
import { createMyList, deleteMyList, updateMyList } from "../../servicios/listas.services";
import { getMyProfile, updateMyProfile } from "../../servicios/perfil.services";
import type { IList } from "../list/IList";
import type { IPerfil } from "./IProfile";
import EditProfileForm from "./EditProfileForm";
import CreateListForm from "./CreateListForm";
import ManageListForm from "./ManageListForm";

export default function ProfilePage() {
  const userContext = useContext(UserContext);
  const [perfil, setPerfil] = useState<IPerfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingList, setSavingList] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");
  const [managingListId, setManagingListId] = useState<number | null>(null);
  const [editingListId, setEditingListId] = useState<number | null>(null);

  const buildProfileListCard = (lista: IPerfil["listasCreadas"][number]): IList => ({
    id: String(lista.id),
    username: perfil?.user.userName || "",
    premium: perfil?.user.rol === "PREMIUM",
    coffee: false,
    pfp: perfil?.user.pfp || "/user/profile-pic/profile1.jpg",
    title: lista.nombre,
    perfumes: Array.from(
      { length: Math.max(1, Math.min(lista.totalPerfumes, 4)) },
      () => "/perfume-info/perfume/lira/xerjoff-lira.jpg"
    ),
  });

  const buildFavoritePerfumeCard = (perfume: IPerfil["perfumesFavoritos"][number]) => ({
    id: String(perfume.id),
    name: perfume.nombre,
    brand: perfume.marca,
    image: perfume.foto,
    olfactoryFamilies: perfume.familiasOlfativas,
  });

  const loadPerfil = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyProfile();
      setPerfil(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  const handleSaveProfile = async (data: { email: string; descripcion: string; foto: string }) => {
    try {
      setSavingProfile(true);
      const updatedUser = await updateMyProfile(data);

      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              user: updatedUser,
            }
          : prev
      );

      userContext?.setUser({
        userName: updatedUser.userName,
        pfp: updatedUser.pfp,
        rol: updatedUser.rol,
      });

      setShowEdit(false);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCreateList = async (data: { nombre: string; esPublica: boolean }) => {
    try {
      setSavingList(true);
      const nuevaLista = await createMyList(data);

      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              listasCreadas: [nuevaLista, ...prev.listasCreadas],
            }
          : prev
      );
    } finally {
      setSavingList(false);
    }
  };

  const handleUpdateList = async (idLista: number, data: { nombre: string; esPublica: boolean }) => {
    try {
      setManagingListId(idLista);
      const updated = await updateMyList(idLista, data);

      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              listasCreadas: prev.listasCreadas.map((lista) =>
                lista.id === idLista ? updated : lista
              ),
            }
          : prev
      );

      setEditingListId(null);
    } finally {
      setManagingListId(null);
    }
  };

  const handleDeleteList = async (idLista: number) => {
    try {
      setManagingListId(idLista);
      await deleteMyList(idLista);

      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              listasCreadas: prev.listasCreadas.filter((lista) => lista.id !== idLista),
            }
          : prev
      );

      setEditingListId((prev) => (prev === idLista ? null : prev));
    } finally {
      setManagingListId(null);
    }
  };

  if (!userContext?.user) {
    return (
      <div className="mx-auto max-w-4xl px-4 mt-25">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="text-3xl">Perfil</h1>
            <p>Debes iniciar sesión para ver tu perfil.</p>
            <Link to="/login" className="btn btn-neutral w-fit">Ir al login</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 mt-25">Cargando perfil...</div>;
  }

  if (error || !perfil) {
    return <div className="mx-auto max-w-4xl px-4 mt-25 text-error">{error || "No se pudo cargar el perfil"}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 mt-25 mb-16">
      <div className="card bg-base-100 shadow-sm mb-8">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="avatar">
              <div className="w-24 rounded-full relative">
                <img src={perfil.user.pfp} alt={`Foto de ${perfil.user.userName}`} />
                {perfil.user.rol === "PREMIUM" && (
                  <img
                    src="/user/icons/crown-1.svg"
                    alt="Icono premium corona"
                    className="absolute -top-6 -left-2 w-10 h-10 -rotate-22"
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold">{perfil.user.userName}</h1>
              <p className="text-sm opacity-70">{perfil.user.email}</p>
              <div className="badge badge-soft badge-neutral mt-2">{perfil.user.rol}</div>
              <p className="mt-4 whitespace-pre-line">
                {perfil.user.descripcion || "Este usuario todavía no ha añadido descripción."}
              </p>
            </div>

            <button className="btn btn-neutral" onClick={() => setShowEdit((prev) => !prev)}>
              {showEdit ? "Cerrar editor" : "Editar perfil"}
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <div className="mb-8">
          <EditProfileForm
            user={perfil.user}
            loading={savingProfile}
            onCancel={() => setShowEdit(false)}
            onSave={handleSaveProfile}
          />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
        <CreateListForm loading={savingList} onCreate={handleCreateList} />

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Mis listas</h2>
              <span className="text-sm opacity-70">{perfil.listasCreadas.length} listas</span>
            </div>

            {perfil.listasCreadas.length === 0 ? (
              <p className="opacity-70">Todavía no has creado ninguna lista.</p>
            ) : (
              <div className="flex flex-wrap gap-12">
                {perfil.listasCreadas.map((lista) => (
                  <ListCard
                    key={lista.id}
                    data={buildProfileListCard(lista)}
                    user={userContext.user ?? undefined}
                    isOwner={true}
                    onEdit={() => setEditingListId((prev) => (prev === lista.id ? null : lista.id))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {editingListId !== null && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Editar lista</h2>
          {perfil.listasCreadas
            .filter((lista) => lista.id === editingListId)
            .map((lista) => (
              <ManageListForm
                key={lista.id}
                lista={lista}
                loading={managingListId === lista.id}
                onSave={(data) => handleUpdateList(lista.id, data)}
                onDelete={() => handleDeleteList(lista.id)}
                onCancel={() => setEditingListId(null)}
              />
            ))}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Perfumes favoritos</h2>
        {perfil.perfumesFavoritos.length === 0 ? (
          <p className="opacity-70">Todavía no tienes perfumes favoritos guardados.</p>
        ) : (
          <div className="flex flex-wrap gap-12">
            {perfil.perfumesFavoritos.map((perfume) => (
              <CardPerfume
                key={perfume.id}
                data={buildFavoritePerfumeCard(perfume)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
