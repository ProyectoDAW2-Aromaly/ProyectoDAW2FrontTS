import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext"
// import { useNavigate } from "react-router";
import { IPerfil } from "../../interfaces/IPerfil";
import { IPerfumeBackend } from "../../interfaces/IPerfume";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { getMyProfile, updateMyProfile } from "../../services/perfil.services";
import { getAllPerfumes } from "../../services/perfume.services";
import { obtenerPerfumistas } from "../../services/perfumista.services";
import { createMyList, deleteMyList, updateMyList } from "../../services/listas.services";
import { IListas } from "../../interfaces/IListas";

export const usePerfilViewModel = () => {
    const userContext = useContext(UserContext);
    // const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [perfil, setPerfil] = useState<IPerfil | null>(null);

    const [adminPerfumes, setAdminPerfumes] = useState<IPerfumeBackend[]>([]);
    const [adminPerfumistas, setAdminPerfumistas] = useState<IPerfumistaBackend[]>([]);

    const [guardarPerfil, setGuardarPerfil] = useState(false);
    const [guardarLista, setGuardarLista] = useState(false);

    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [vistaAdmin, setVistaAdmin] = useState<"perfumes" | "perfumistas">("perfumes");

    const [manegarListaId, setManejarListaId] = useState<number | null>(null);
    const [editarListaId, setEditarListaId] = useState<number | null>(null);

    const cargarPerfil = async () => {
        try {
            setLoading(true);
            setError("");
            const perfilData = await getMyProfile();
            setPerfil(perfilData);

            if (perfilData.user.rol === "ADMIN") {
                const [perfumes, perfumistas] = await Promise.all([
                    getAllPerfumes(),
                    obtenerPerfumistas(), // TODO: CAMBIAR POR LA BUENA
                ]);
                setAdminPerfumes(perfumes || []);
                setAdminPerfumistas(perfumistas || []);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se ha podido cargar el perfil.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarPerfil();
    }, []);

    const handleGuardarPerfil = async (data: {
        email: string;
        descripcion: string;
        foto?: string;
        archivo?: File | null;
    }) => {
        try {
            setGuardarPerfil(true);
            const actualizadoUsuario = await updateMyProfile(data);

            setPerfil((prev) => 
                prev ? {
                    ...prev,
                    user: {
                        ...prev.user,
                        email: actualizadoUsuario.email || prev.user.email,
                        descripcion: actualizadoUsuario.descripcion || prev.user.descripcion,
                        pfp: actualizadoUsuario.pfp || prev.user.pfp // * Mirar si esto soluciona el error ese de la foto
                    }
                } : prev
            );

            userContext?.setUser({
                id: actualizadoUsuario.id ?? -1,
                username: actualizadoUsuario.userName || userContext?.user?.username || "",
                pfp: actualizadoUsuario.pfp,
                rol: actualizadoUsuario.rol,
            });

            setMostrarEditar(false);
        } finally {
            setGuardarPerfil(false);
        }
    };

    const handleCrearlista = async (data: { nombre: string; esPublica: boolean }) => {
        try {
            setGuardarLista(true);
            const nuevaLista = await createMyList(data);
            setPerfil((prev) =>
                prev ? { ...prev, listasCreadas: [nuevaLista, ...prev.listasCreadas] } : prev
            );
        } finally {
            setGuardarLista(false);
        }
    }

    const handleActualizarLista = async (idLista: number, data: { nombre: string; esPublica: boolean }) => {
        try {
            setManejarListaId(idLista);
            const actualizada = await updateMyList(idLista, data);
            setPerfil((prev) => 
                prev ? {
                    ...prev,
                    listasCreadas: prev.listasCreadas.map((lista) => 
                        lista.id === idLista ? { ...lista, ...actualizada } : lista
                    ),
                } : prev
            );

            setEditarListaId(null);
        } finally {
            setManejarListaId(null);
        }
    }

    const handleBorrarLista = async (idLista: number) => {
        try {
            setManejarListaId(idLista);
            await deleteMyList(idLista);
            setPerfil((prev) =>
                prev ? {
                    ...prev,
                    listasCreadas: prev.listasCreadas.filter((lista) =>
                        lista.id !== idLista
                    ),
                } : prev
            );

            setEditarListaId((prev) => (prev === idLista ? null : prev))
        } finally {
            setManejarListaId(null)
        }
    }

    // ! ESTO CREO QUE ES MEJOR HACER UNA INTERFAZ!!!
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
        descripcion: "",
        genero: "",
        marca: {
            nombre: perfume.marca,
            isdarklogo: true,
            foto: "",
        },
        foto: perfume.foto,
        familiasOlfativas: perfume.familiasOlfativas.map((nombre) => ({ nombre })),
    });

    // ? MIRAR LO DE ARRIBA PLS

    return {
        // Estado
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
        // Acciones
        handleGuardarPerfil,
        handleCrearlista,
        handleActualizarLista,
        handleBorrarLista,
        // Builders
        buildProfileListCard,
        buildSavedListCard,
        buildFavoritePerfumeCard,
        // Helpers derivados
        isAdmin: perfil?.user?.rol === "ADMIN",
        user: userContext?.user,
    };
}