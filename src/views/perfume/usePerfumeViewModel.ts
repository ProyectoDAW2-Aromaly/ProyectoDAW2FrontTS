import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IPerfume, IPerfumeBackend, IValoracion, IValoracionBooleanKey, IValoracionNumeroKey } from "./IPerfume";
import { getPerfumeById } from "../../services/perfume.services";
import { mapPerfumeFromBackend } from "./utils/PerfumeMapper";
import { addFavorite, isFavorite, removeFavorite } from "../../services/votaciones.services";

export const usePerfumeViewModel = () => {
    const navigate = useNavigate();
    const [selectedPerfume, setSelectedPerfume] = useState<IPerfume>()
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState<IValoracion>({})
    const [liked, setLiked] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);

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

    return {
        selectedPerfume,
        rating,
        handleNumberRatingChange,
        handleSeasonRatingChange,
        liked,
        toggleFavorite,
        loadingFavorite,
        loading
    }
}
