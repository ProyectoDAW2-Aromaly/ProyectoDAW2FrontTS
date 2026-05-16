import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ListaCard } from "../../components/ListaCard";
import { PerfumeCard } from "../../components/PerfumeCard";
import UserContext from "../../context/UserContext";
import { getMyProfile, updateMyProfile } from "../../services/perfil.services";
import { createMyList, deleteMyList, updateMyList } from "../../services/listas.services";
import { getAllPerfumes } from "../../services/perfume.services";
import { getNombrePerfumistas } from "../../services/perfumista.services";
import { normalizePerfumeImage } from "../../utils/assets";
import type { IListas } from "../../interfaces/IListas";
import type { IPerfil } from "../../interfaces/IPerfil";
import EditProfileForm from "./EditProfileForm";
import CreateListForm from "./CreateListForm";
import ManageListForm from "./ManageListForm";

export default function ProfilePage() {
  const userContext = useContext(UserContext);
  const [perfil, setPerfil] = useState<IPerfil | null>(null);
  const [adminPerfumes, setAdminPerfumes] = useState<any[]>([]);
  const [adminPerfumistas, setAdminPerfumistas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingList, setSavingList] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [adminView, setAdminView] = useState<"perfumes" | "perfumistas">("perfumes");
  const [error, setError] = useState("");
  const [managingListId, setManagingListId] = useState<number | null>(null);
  const [editingListId, setEditingListId] = useState<number | null>(null);

  const buildProfileListCard = (lista: IPerfil["listasCreadas"][number]): IListas => ({
    id: String(lista.id),
    nombreUsuario: perfil?.user.userName || "",
    premium: perfil?.user.rol === "PREMIUM",
    cafe: false,
    pfp: perfil?.user.pfp || "/user/profile-pic/default-profile.jpg",
    titulo: lista.nombre,
    perfumes: lista.perfumeFotos || [],
    rol: perfil?.user.rol,
  });

  const buildSavedListCard = (lista: IPerfil["listasGuardadas"][number]): IListas => ({
    id: String(lista.listaId),
    nombreUsuario: lista.creadorUsername || "",
    premium: lista.creadorRol === "PREMIUM",
    cafe: false,
    pfp: lista.creadorFoto || "/user/profile-pic/default-profile.jpg",
    titulo: lista.listaNombre,
    perfumes: lista.perfumeFotos || [],
    rol: lista.creadorRol,
  });

  const buildFavoritePerfumeCard = (perfume: IPerfil["perfumesFavoritos"][number]) => ({
    id: String(perfume.id),
    nombre: perfume.nombre,
    marca: perfume.marca,
    foto: perfume.foto,
    familiasOlfativas: perfume.familiasOlfativas,
  });

  const loadPerfil = async () => {
    try {
      setLoading(true);
      setError("");
      const perfilData = await getMyProfile();
      setPerfil(perfilData);

      if (perfilData.user.rol === "ADMIN") {
        const [perfumes, perfumistas] = await Promise.all([
          getAllPerfumes(),
          getNombrePerfumistas(),
        ]);
        setAdminPerfumes(perfumes || []);
        setAdminPerfumistas(perfumistas || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  const handleSaveProfile = async (data: { email: string; descripcion: string; foto?: string; archivo?: File | null }) => {
    try {
      setSavingProfile(true);
      const updatedUser = await updateMyProfile(data);

      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              user: {
                ...prev.user,
                email: updatedUser.email || prev.user.email,
                descripcion: updatedUser.descripcion || prev.user.descripcion,
                pfp: updatedUser.pfp || prev.user.pfp,
              },
            }
          : prev
      );

      userContext?.setUser({
        userName: perfil?.user.userName || userContext?.user?.userName || "",
        pfp: updatedUser.pfp || perfil?.user.pfp || "",
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
                lista.id === idLista ? { ...lista, ...updated } : lista
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

  const getNombre = (value: unknown, fallback: string) => {
    if (typeof value === "string" && value.trim()) return value;
    if (value && typeof value === "object" && "nombre" in value) {
      const nombre = (value as { nombre?: unknown }).nombre;
      if (typeof nombre === "string" && nombre.trim()) return nombre;
    }
    return fallback;
  };

  const renderAdminTables = () => (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={`btn ${adminView === "perfumes" ? "btn-neutral" : "btn-outline"}`}
          onClick={() => setAdminView("perfumes")}
        >
          Gestionar perfumes
        </button>
        <button
          type="button"
          className={`btn ${adminView === "perfumistas" ? "btn-neutral" : "btn-outline"}`}
          onClick={() => setAdminView("perfumistas")}
        >
          Gestionar perfumistas
        </button>
      </div>

      {adminView === "perfumes" ? (
      <section>
        <h2 className="text-2xl font-semibold mb-4">Perfumes</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Perfume</th>
                <th>Marca</th>
                <th>Genero</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {adminPerfumes.map((perfume) => (
                <tr key={perfume.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {perfume.foto ? (
                            <img src={normalizePerfumeImage(perfume.foto)} alt={`Perfume ${perfume.nombre}`} />
                          ) : (
                            <div className="bg-neutral text-neutral-content flex h-12 w-12 items-center justify-center">
                              {String(perfume.nombre || "?").charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{perfume.nombre}</div>
                        <div className="text-sm opacity-50">ID {perfume.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getNombre(perfume.marca, "Sin marca")}</td>
                  <td><span className="badge badge-ghost badge-sm">{getNombre(perfume.genero, "Sin genero")}</span></td>
                  <th>
                    <Link to={`/perfume/${perfume.id}`} className="btn btn-ghost btn-xs">details</Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      ) : (

      <section>
        <h2 className="text-2xl font-semibold mb-4">Perfumistas</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Perfumista</th>
                <th>Descripcion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {adminPerfumistas.map((perfumista) => (
                <tr key={perfumista.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {perfumista.foto ? (
                            <img src={perfumista.foto} alt={`Perfumista ${perfumista.nombre}`} />
                          ) : (
                            <div className="bg-neutral text-neutral-content flex h-12 w-12 items-center justify-center">
                              {String(perfumista.nombre || "?").charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{perfumista.nombre}</div>
                        <div className="text-sm opacity-50">ID {perfumista.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{typeof perfumista.descripcion === "string" ? perfumista.descripcion : "Sin descripcion"}</td>
                  <th>
                    <Link to={`/perfumista/${perfumista.id}`} className="btn btn-ghost btn-xs">details</Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}
    </div>
  );

  if (!userContext?.user) {
    return (
      <div className="mx-auto max-w-4xl px-4 mt-25">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="text-3xl">Perfil</h1>
            <p>Debes iniciar sesion para ver tu perfil.</p>
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

  const isAdmin = perfil.user?.rol === "ADMIN";

  return (
    <div className="mx-auto max-w-7xl px-4 mt-25 mb-16">
      <div className="card bg-base-100 shadow-sm mb-8">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="avatar">
              <div className="w-24 rounded-full relative">
                <img src={perfil.user?.pfp || "/user/profile-pic/default-profile.jpg"} alt={`Foto de ${perfil.user?.userName || "usuario"}`} />
                {(perfil.user?.rol === "PREMIUM" || perfil.user?.rol === "ADMIN") && (
                  <img
                    src={perfil.user?.rol === "ADMIN" ? "/user/icons/admin-icon.svg" : "/user/icons/crown-1.svg"}
                    alt={perfil.user?.rol === "ADMIN" ? "Icono admin" : "Icono premium corona"}
                    className="absolute -top-4 -left-1 z-10 w-8 h-8 -rotate-12 drop-shadow"
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold">{perfil.user?.userName}</h1>
              <p className="text-sm opacity-70">{perfil.user?.email}</p>
              <div className="badge badge-xs badge-soft badge-neutral mt-2">{perfil.user?.rol}</div>
              <p className="mt-4 whitespace-pre-line">
                {perfil.user?.descripcion || "Este usuario todavia no ha anadido descripcion."}
              </p>
            </div>

            {!showEdit && (
              <button className="btn btn-neutral hover:hover:btn-accent text-primary-content" onClick={() => setShowEdit(true)}>
                Editar perfil
              </button>
            )}
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

      {isAdmin ? (
        renderAdminTables()
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
            <CreateListForm
              loading={savingList}
              userRol={perfil.user.rol}
              listasCreadasCount={perfil.listasCreadas?.length || 0}
              onCreate={handleCreateList}
            />
            
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">Mis listas</h2>
                  <span className="text-sm opacity-70">{perfil.listasCreadas?.length || 0} listas</span>
                </div>

                {(!perfil.listasCreadas || perfil.listasCreadas.length === 0) ? (
                  <p className="opacity-70">Todavia no has creado ninguna lista.</p>
                ) : (
                  <div className="flex flex-wrap gap-12">
                    {perfil.listasCreadas.map((lista) => (
                      <ListaCard
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

          <div className="card bg-base-100 shadow-sm mt-8">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title">Listas guardadas</h2>
                <span className="text-sm opacity-70">{perfil.listasGuardadas?.length || 0} listas</span>
              </div>

              {(!perfil.listasGuardadas || perfil.listasGuardadas.length === 0) ? (
                <p className="opacity-70">Todavia no has guardado ninguna lista.</p>
              ) : (
                <div className="flex flex-wrap gap-12">
                  {perfil.listasGuardadas.map((lista) => (
                    <ListaCard
                      key={lista.id}
                      data={buildSavedListCard(lista)}
                      user={userContext.user ?? undefined}
                      isOwner={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {editingListId !== null && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Editar lista</h2>
              {perfil.listasCreadas?.filter((lista) => lista.id === editingListId)
                .map((lista) => (
                  <ManageListForm
                    key={`manage-${lista.id}`}
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
            {(!perfil.perfumesFavoritos || perfil.perfumesFavoritos.length === 0) ? (
              <p className="opacity-70">Todavia no tienes perfumes favoritos guardados.</p>
            ) : (
              <div className="flex flex-wrap gap-12">
                {perfil.perfumesFavoritos.map((perfume) => (
                  <PerfumeCard
                    key={perfume.id}
                    data={buildFavoritePerfumeCard(perfume)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
