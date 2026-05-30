import { Link } from "react-router";
import { usePerfilViewModel } from "./usePerfilViewModel";
import PerfilCabecera from "./components/PerfilCabecera";
import TablaAdmin from "./components/TablaAdmin";
import MisListas from "./components/MisListas";
import CreateListForm from "./CreateListForm";
import EditProfileForm from "./EditProfileForm";
import ListasGuardadas from "./components/ListasGuardadas";
import PerfumesFavoritos from "./components/PerfumesFavoritos";

export default function ProfilePage() {
    const {
        perfil,
        adminPerfumes,
        adminPerfumistas,
        loading,
        guardarPerfil,
        guardarLista,
        mostrarEditar,
        setMostrarEditar,
        vistaAdmin,
        setVistaAdmin,
        error,
        manegarListaId,
        editarListaId,
        setEditarListaId,
        handleGuardarPerfil,
        handleCrearlista,
        handleActualizarLista,
        handleBorrarLista,
        buildProfileListCard,
        buildSavedListCard,
        buildFavoritePerfumeCard,
        isAdmin,
        user,
    } = usePerfilViewModel();

    if (!user) {
        return (
            <div className="mx-auto max-w-4xl px-4 mt-25">
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h1 className="text-3xl">Perfil</h1>
                        <p>Debes iniciar sesión para ver tu perfil.</p>
                        <Link to="/login" className="btn btn-neutral w-fit">Ir al login.</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return <div className="mx-auto max-w-4xl px-4 mt-25">Cargando perfil...</div>;
    if (error || !perfil) return <div className="mx-auto max-w-4xl px-4 mt-25 text-error">{error || "No se ha podido cargar el perfil"}</div>;

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 mb-16">
            <PerfilCabecera
                usuario={perfil.user}
                mostrarEditar={mostrarEditar}
                onEditarPerfil={() => setMostrarEditar(true)}
            />
 
            {mostrarEditar && (
                <div className="mb-8">
                    <EditProfileForm
                        user={perfil.user}
                        loading={guardarPerfil}
                        onCancel={() => setMostrarEditar(false)}
                        onSave={handleGuardarPerfil}
                    />
                </div>
            )}
 
            {isAdmin ? (
                <TablaAdmin
                    perfumes={adminPerfumes}
                    perfumistas={adminPerfumistas}
                    vistaActual={vistaAdmin}
                    onCambiarVista={setVistaAdmin}
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
                        <CreateListForm
                            loading={guardarLista}
                            userRol={perfil.user.rol}
                            listasCreadasCount={perfil.listasCreadas?.length || 0}
                            onCreate={handleCrearlista}
                        />
 
                        {/* Aparece debajo de las cards dentro del componente */}
                        <MisListas
                            listas={perfil.listasCreadas}
                            editarListaId={editarListaId}
                            manegarListaId={manegarListaId}
                            buildProfileListCard={buildProfileListCard}
                            onEditar={(id: number | null) => setEditarListaId((prev) => (prev === id ? null : id))} // ! Mirrar si está bien, con id a secas es any
                            onGuardar={handleActualizarLista}
                            onBorrar={handleBorrarLista}
                            onCancelar={() => setEditarListaId(null)}
                        />
                    </div>
 
                    <ListasGuardadas
                        listas={perfil.listasGuardadas}
                        buildSavedListCard={buildSavedListCard}
                    />
 
                    <PerfumesFavoritos
                        perfumes={perfil.perfumesFavoritos}
                        buildFavoritePerfumeCard={buildFavoritePerfumeCard}
                    />
                </>
            )}
        </div>
    );


}