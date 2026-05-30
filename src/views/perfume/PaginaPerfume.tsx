import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { SeccionInfoPerfume } from "./components/SeccionInfoPerfume";
import { SeccionPiramide } from "./components/SeccionPiramide";
import { SeccionValoraciones } from "./components/SeccionValoraciones";
import { SeccionRecomendados } from "./components/SeccionRecomendados";
import { SeccionComentarios } from "./components/SeccionComentarios";

const PaginaPerfume = () => {

    const {
        user,
        selectedPerfume,
        loading,
        rating,
        handleNumberRatingChange,
        handleSeasonRatingChange,
        liked,
        toggleFavorite,
        loadingFavorite,
        goToEditPerfume,
        comentarios,
        listasUsuario,
        listasLoading,
        listasError,
        handleTogglePerfumeInList,
        handleCrearComentario
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
                onCrearComentario={handleCrearComentario}
                comentarios={comentarios}
            />
        </div>
    )
}

export default PaginaPerfume;