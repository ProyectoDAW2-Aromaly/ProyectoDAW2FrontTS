import { usePerfumeViewModel } from "./usePerfumeViewModel";
import type { IUser } from "../../App";
import { useNavigate } from "react-router";
import { SeccionInfoPerfume } from "./components/SeccionInfoPerfume";
import { SeccionPiramide } from "./components/SeccionPiramide";
import { SeccionValoraciones } from "./components/SeccionValoraciones";
import { SeccionRecomendados } from "./components/SeccionRecomendados";
import { SeccionComentarios } from "./components/SeccionComentarios";
import { MOCKED_PERFUMES, TEMP_USER } from "./utils/PerfumeConstantes";

interface IPerfumePage {
    user?: IUser,
    // * Definimos que se le pasará una función que reciba un usuario. Devuelve void
    setUser: (val?: IUser) => void
}

const PaginaPerfume = ({ user, setUser }: IPerfumePage) => {
    const navigate = useNavigate();

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
        toggleLiked,
    } = usePerfumeViewModel();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    if (selectedPerfume === undefined) return null

    return (
        <div>
            <div className="relative mt-15">
                <div className="absolute top-2 left-2 flex gap-2 z-30">
                    <button onClick={() => setUser(TEMP_USER)} className="btn btn-xs">
                        Usuario
                    </button>
                    <button onClick={() => setUser(undefined)} className="btn btn-xs">
                        No usuario
                    </button>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 mt-25">
                <SeccionInfoPerfume
                    perfume={selectedPerfume}
                    user={user}
                    liked={liked}
                    onToggleLiked={toggleLiked}
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
        </div>
    )
}

export default PaginaPerfume;