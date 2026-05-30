import { useState } from "react";
import Paginacion from "../../../components/Paginacion";
import { PerfumeCard } from "../../../components/PerfumeCard";
import { IPerfil } from "../../../interfaces/IPerfil";
import { IPerfumeBackend } from "../../../interfaces/IPerfume";

interface Props {
    perfumes: IPerfil["perfumesFavoritos"];
    buildFavoritePerfumeCard: (perfume: IPerfil["perfumesFavoritos"][number]) => IPerfumeBackend;
}

const ITEMS_POR_PAGINA = 12;


export default function PerfumesFavoritos({ perfumes, buildFavoritePerfumeCard }: Props) {

    const [paginaPerfumes, setPaginaPerfumes] = useState(1);

    const perfumesPaginados = perfumes.slice(
        (paginaPerfumes - 1) * ITEMS_POR_PAGINA,
        paginaPerfumes * ITEMS_POR_PAGINA
    );

    return (
        <>
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Perfumes favoritos</h2>

                {(!perfumes || perfumes.length === 0) ? (
                    <p className="opacity-70">Todavia no tienes perfumes favoritos guardados.</p>
                ) : (
                    <div className="flex flex-wrap gap-12">
                        {perfumesPaginados.map((perfume) => (
                            <PerfumeCard
                                key={perfume.id}
                                data={buildFavoritePerfumeCard(perfume)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-10">
                <Paginacion
                    totalItems={perfumes.length}
                    itemsPorPagina={ITEMS_POR_PAGINA}
                    paginaActual={paginaPerfumes}
                    handleCambiarPagina={setPaginaPerfumes}
                />
            </div>

        </>
    );
}