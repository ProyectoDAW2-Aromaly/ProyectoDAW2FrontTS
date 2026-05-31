import { useState } from "react";
import { ListaCard } from "../../../components/ListaCard";
import { IListas } from "../../../interfaces/IListas";
import { IPerfil } from "../../../interfaces/IPerfil";
import Paginacion from "../../../components/Paginacion";

interface Props {
    listas: IPerfil["listasGuardadas"];
    buildSavedListCard: (lista: IPerfil["listasGuardadas"][number]) => IListas;
}

const ITEMS_POR_PAGINA = 6;

export default function ListasGuardadas({ listas, buildSavedListCard }: Props) {

    const [paginaListas, setPaginaListas] = useState(1);

    const listasPaginadas = listas.slice(
        (paginaListas - 1) * ITEMS_POR_PAGINA,
        paginaListas * ITEMS_POR_PAGINA
    );

    return (

        <div className="pt-10">
            <div className="flex items-center justify-between">
                <h2 className="card-title mb-2">Listas guardadas</h2>
                <span className="text-sm opacity-70">{listas?.length || 0} listas</span>
            </div>

            {(!listas || listas.length === 0) ? (
                <p className="opacity-70">Todavia no has guardado ninguna lista.</p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-10 mb-10">
                        {listasPaginadas.map((lista) => (
                            <ListaCard
                                key={`saved-${lista.id}-${lista.listaId}`}
                                data={buildSavedListCard(lista)}
                                isOwner={false}
                            />
                        ))}
                    </div>
                    <Paginacion
                        totalItems={listas.length}
                        itemsPorPagina={ITEMS_POR_PAGINA}
                        paginaActual={paginaListas}
                        handleCambiarPagina={setPaginaListas}
                    />
                </>
            )}
        </div>

    );
}