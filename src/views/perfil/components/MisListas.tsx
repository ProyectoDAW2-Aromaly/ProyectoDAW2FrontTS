import { useState } from "react";
import { ListaCard } from "../../../components/ListaCard";
import { IListas } from "../../../interfaces/IListas";
import { IPerfil } from "../../../interfaces/IPerfil";
import ManageListForm from "../ManageListForm";
import Paginacion from "../../../components/Paginacion";


interface Props {
    listas: IPerfil["listasCreadas"];
    editarListaId: number | null;
    manegarListaId: number | null;
    buildProfileListCard: (lista: IPerfil["listasCreadas"][number]) => IListas;
    onEditar: (id: number) => void;
    onGuardar: (id: number, data: { nombre: string; esPublica: boolean }) => void;
    onBorrar: (id: number) => void;
    onCancelar: () => void;
}

const ITEMS_POR_PAGINA = 4;

export default function MisListas({
    listas,
    editarListaId,
    manegarListaId,
    buildProfileListCard,
    onEditar,
    onGuardar,
    onBorrar,
    onCancelar,
}: Props) {

    const [paginaListas, setPaginaListas] = useState(1);

    const listasPaginadas = listas.slice(
        (paginaListas - 1) * ITEMS_POR_PAGINA,
        paginaListas * ITEMS_POR_PAGINA
    );

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="card-title mb-2">Mis listas</h2>
                <span className="text-sm opacity-70">{listas?.length || 0} listas</span>
            </div>

            {(!listas || listas.length === 0) ? (
                <p className="opacity-70">Todavia no has creado ninguna lista.</p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-12 mb-10">
                        {listasPaginadas.map((lista) => (
                            <ListaCard
                                key={lista.id}
                                data={buildProfileListCard(lista)}
                                isOwner={true}
                                onEdit={() => onEditar(lista.id)}
                            />
                        ))}
                    </div>

                    {/* Aparece debajo de todas las cards con separador */}
                    {editarListaId !== null && (
                        <div className="mt-6 border-t border-base-content/10 pt-6">
                            {listasPaginadas
                                .filter((lista) => lista.id === editarListaId)
                                .map((lista) => (
                                    <ManageListForm
                                        key={`manage-${lista.id}`}
                                        lista={lista}
                                        loading={manegarListaId === lista.id}
                                        onSave={async (data) => onGuardar(lista.id, data)}
                                        onDelete={async () => onBorrar(lista.id)}
                                        onCancel={onCancelar}
                                    />
                                ))}
                        </div>
                    )}
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