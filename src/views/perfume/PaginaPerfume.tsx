import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { SeccionInfoPerfume } from "./components/SeccionInfoPerfume";
import { SeccionPiramide } from "./components/SeccionPiramide";
import { SeccionValoraciones } from "./components/SeccionValoraciones";
import { SeccionRecomendados } from "./components/SeccionRecomendados";
import { SeccionComentarios } from "./components/SeccionComentarios";
import {
    addPerfumeToList,
    getMyListsForPerfume,
    removePerfumeFromList
} from "../../services/listas.services";
import { IListaPerfumeOption } from "../../interfaces/IListas";
import { IVotacion } from "../../interfaces/IVotacion";
import { crearComentario, obtenerComentariosPorPerfume } from "../../services/comentario.services";

const PaginaPerfume = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user ?? undefined;
    const navigate = useNavigate();
    const [listasUsuario, setListasUsuario] = useState<IListaPerfumeOption[]>([]);
    const [listasLoading, setListasLoading] = useState(false);
    const [listasError, setListasError] = useState("");
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState<IVotacion[]>([]);

    const goToEditPerfume = (perfumeId: string) => {
        navigate(`/perfume/formulario?edit=${perfumeId}`);
    }

    const {
        selectedPerfume,
        loading,
        rating,
        handleNumberRatingChange,
        handleSeasonRatingChange,
        liked,
        toggleFavorite,
        loadingFavorite,
    } = usePerfumeViewModel();

    useEffect(() => {
        const loadListas = async () => {
            if (!user || !selectedPerfume?.id) {
                setListasUsuario([]);
                return;
            }

            try {
                setListasLoading(true);
                setListasError("");
                const listas = await getMyListsForPerfume(Number(selectedPerfume.id));
                setListasUsuario(listas);
            } catch (err) {
                setListasError(err instanceof Error ? err.message : "No se pudieron cargar las listas");
            } finally {
                setListasLoading(false);
            }
        };

        loadListas();
    }, [user, selectedPerfume?.id]);

    useEffect(() => {
        const loadComentarios = async () => {
            if (!selectedPerfume?.id) return;

            try {
                const data = await obtenerComentariosPorPerfume(Number(selectedPerfume.id));
                setComentarios(data);
            } catch (err) {
                console.error(err)
            }
        };

        loadComentarios()
    }, [selectedPerfume?.id])

    const handleTogglePerfumeInList = async (idLista: number, checked: boolean) => {
        if (!selectedPerfume?.id) return;

        const idPerfume = Number(selectedPerfume.id);

        try {
            setListasError("");

            if (checked) {
                await addPerfumeToList(idLista, idPerfume);
            } else {
                await removePerfumeFromList(idLista, idPerfume);
            }

            setListasUsuario((prev) =>
                prev.map((lista) =>
                    lista.id === idLista
                        ? {
                            ...lista,
                            contienePerfume: checked,
                            totalPerfumes: checked
                                ? lista.totalPerfumes + 1
                                : Math.max(0, lista.totalPerfumes - 1),
                        }
                        : lista
                )
            );
        } catch (err) {
            setListasError(err instanceof Error ? err.message : "No se pudo actualizar la lista");
        }
    };

    const handleCrearComentario = async () => {
        try {
            const nuevoComentario: IVotacion = {
                id_perfume: Number(selectedPerfume?.id),
                id_usuario: user?.id ?? -1,
                tipo: "comentario",
                valor: comentario
            };

            const creado = await crearComentario(nuevoComentario);

            setComentarios([...comentarios, creado]);
            setComentario("");
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    if (selectedPerfume === undefined) return null

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25">
            <SeccionInfoPerfume
                perfume={selectedPerfume}
                liked={liked}
                loadingFavorite={loadingFavorite}
                listasUsuario={listasUsuario}
                listasLoading={listasLoading}
                listasError={listasError}
                onTogglePerfumeInList={handleTogglePerfumeInList}
                onToggleLiked={toggleFavorite}
                onEditPerfume={goToEditPerfume}
            />
            <SeccionPiramide notas={selectedPerfume.notas} />
            <SeccionValoraciones
                user={user}
                valoracion={rating}
                onNumberChange={handleNumberRatingChange}
                onSeasonChange={handleSeasonRatingChange}
            />
            <SeccionRecomendados />
            <SeccionComentarios
                user={user}
                comentario={comentario}
                setComentario={setComentario}
                onCrearComentario={handleCrearComentario}
                comentarios={comentarios}
            />
        </div>
    )
}

export default PaginaPerfume;
