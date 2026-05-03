import { useEffect, useState } from "react";
import type { IUser } from "../../App";
import { useNavigate } from "react-router";
import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { SeccionInfoPerfume } from "./components/SeccionInfoPerfume";
import { SeccionPiramide } from "./components/SeccionPiramide";
import { SeccionValoraciones } from "./components/SeccionValoraciones";
import { SeccionRecomendados } from "./components/SeccionRecomendados";
import { SeccionComentarios } from "./components/SeccionComentarios";
import { MOCKED_PERFUMES } from "./utils/PerfumeConstantes";
import {
    addPerfumeToList,
    getMyListsForPerfume,
    removePerfumeFromList,
    type IListaPerfumeOption,
} from "../../servicios/listas.services";

interface IPerfumePage {
    user?: IUser,
    setUser: (val?: IUser) => void
}

const PaginaPerfume = ({ user }: IPerfumePage) => {
    const navigate = useNavigate();
    const [listasUsuario, setListasUsuario] = useState<IListaPerfumeOption[]>([]);
    const [listasLoading, setListasLoading] = useState(false);
    const [listasError, setListasError] = useState("");

    const goToEditPerfume = (perfumeId: string) => {
        navigate(`/perfume/form?edit=${perfumeId}`);
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
                user={user}
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
            <SeccionRecomendados user={user} mockedPerfumes={MOCKED_PERFUMES} />
            <SeccionComentarios user={user} />
        </div>
    )
}

export default PaginaPerfume;
