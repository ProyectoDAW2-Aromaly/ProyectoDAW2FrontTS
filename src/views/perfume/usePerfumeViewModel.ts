import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IPerfume, IPerfumeBackend, IValoracion, IValoracionBooleanKey, IValoracionNumeroKey } from "../../interfaces/IPerfume";
import { getPerfumeById } from "../../services/perfume.services";
import { mapPerfumeFromBackend } from "./utils/PerfumeMapper";
import { addFavorite, isFavorite, removeFavorite } from "../../services/votaciones.services";
import UserContext from "../../context/UserContext";
import { IListaPerfumeOption } from "../../interfaces/IListas";
import { IVotacion } from "../../interfaces/IVotacion";
import { crearComentario, obtenerComentariosPorPerfume } from "../../services/comentario.services";
import { addPerfumeToList, getMyListsForPerfume, removePerfumeFromList } from "../../services/listas.services";

export const usePerfumeViewModel = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user ?? undefined;
    const navigate = useNavigate();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState<IValoracion>({})
    const [liked, setLiked] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const [listasUsuario, setListasUsuario] = useState<IListaPerfumeOption[]>([]);
    const [listasLoading, setListasLoading] = useState(false);
    const [listasError, setListasError] = useState("");
    const [comentarios, setComentarios] = useState<IVotacion[]>([]);

    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            navigate("/not-found");
            return;
        }

        getPerfumeById(id)
            .then((p: IPerfumeBackend) => {
                setSelectedPerfume(mapPerfumeFromBackend(p));
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
                navigate("/not-found");
            });
    }, [id, navigate])

    useEffect(() => {
        const loadFavoriteStatus = async () => {
            if (!selectedPerfume?.id) return;

            try {
                const favorite = await isFavorite(Number(selectedPerfume.id));
                setLiked(favorite);
            } catch (error) {
                console.error(error);
                setLiked(false);
            }
        };

        loadFavoriteStatus();
    }, [selectedPerfume?.id]);

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

    const goToEditPerfume = (perfumeId: string) => {
        navigate(`/perfume/formulario?edit=${perfumeId}`);
    }

    const handleNumberRatingChange = (attr: IValoracionNumeroKey, value?: number) => {
        setRating((prev) => ({ ...prev, [attr]: value }));
    }

    const handleSeasonRatingChange = (attr: IValoracionBooleanKey, value: boolean) => {
        setRating((prev) => ({ ...prev, [attr]: value }));
    }

    const toggleFavorite = async () => {
        if (!selectedPerfume?.id) return;

        try {
            setLoadingFavorite(true);

            if (liked) {
                await removeFavorite(Number(selectedPerfume.id));
                setLiked(false);
            } else {
                await addFavorite(Number(selectedPerfume.id));
                setLiked(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFavorite(false);
        }
    }

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

    const handleCrearComentario = async (comentario: string) => {
        try {
            const nuevoComentario: IVotacion = {
                id_perfume: Number(selectedPerfume?.id),
                id_usuario: user?.id ?? -1,
                tipo: "comentario",
                valor: comentario
            };

            const creado = await crearComentario(nuevoComentario);

            setComentarios([...comentarios, creado]);
        } catch (err) {
            console.error(err);
        }
    }

    return {
        user,
        selectedPerfume,
        rating,
        handleNumberRatingChange,
        handleSeasonRatingChange,
        liked,
        toggleFavorite,
        loadingFavorite,
        loading,
        goToEditPerfume,
        comentarios,
        listasUsuario,
        listasLoading,
        listasError,
        handleTogglePerfumeInList,
        handleCrearComentario
    }
}