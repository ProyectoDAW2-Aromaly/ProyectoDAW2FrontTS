import { useEffect, useRef, useState } from "react";
import { ListaCard } from "../../../components/ListaCard";
import { IListas } from "../../../interfaces/IListas";
import { IPerfil } from "../../../interfaces/IPerfil";
import ManageListForm from "../ManageListForm";
import Paginacion from "../../../components/Paginacion";
import { UserRol } from "../../../services/usuarios.services";


interface Props {
    listas: IPerfil["listasCreadas"];
    editarListaId: number | null;
    manegarListaId: number | null;
    userRol: UserRol;
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
    userRol,
    buildProfileListCard,
    onEditar,
    onGuardar,
    onBorrar,
    onCancelar,
}: Props) {

    // Guarda la página actual
    const [paginaListas, setPaginaListas] = useState(1);

    const formularioEditarRef = useRef<HTMLDivElement | null>(null);

    // Cortamos los datos para la paginación
    const listasPaginadas = listas.slice(
        // pagina actual (3) -  1 = 2 || 2 * 6 = 12 (inicio)
        (paginaListas - 1) * ITEMS_POR_PAGINA,
        // 3 * 6 = 18 (final)
        paginaListas * ITEMS_POR_PAGINA
        // listas.slice(12, 18) → devuelve 12, 13, 14, 15, 16 y 17 (no 18)
    );

    useEffect(() => {
        if (editarListaId === null) return;

        formularioEditarRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [editarListaId]);

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
                        <div ref={formularioEditarRef} className="mt-6 scroll-mt-28 border-t border-base-content/10 pt-6">
                            {listasPaginadas
                                .filter((lista) => lista.id === editarListaId)
                                .map((lista) => (
                                    <ManageListForm
                                        key={`manage-${lista.id}`}
                                        lista={lista}
                                        loading={manegarListaId === lista.id}
                                        userRol={userRol}
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
