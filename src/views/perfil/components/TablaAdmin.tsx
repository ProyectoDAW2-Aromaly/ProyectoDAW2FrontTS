import { Link } from "react-router";
import { useState } from "react";
import { IPerfumeBackend } from "../../../interfaces/IPerfume";
import { IPerfumistaBackend } from "../../../interfaces/IPerfumista";
import Paginacion from "../../../components/Paginacion";

interface Props {
    perfumes: IPerfumeBackend[];
    perfumistas: IPerfumistaBackend[];
    vistaActual: "perfumes" | "perfumistas";
    onCambiarVista: (vista: "perfumes" | "perfumistas") => void;
}

const ITEMS_POR_PAGINA = 12;

export default function TablaAdmin({ perfumes, perfumistas, vistaActual, onCambiarVista }: Props) {
    const [paginaPerfumes, setPaginaPerfumes] = useState(1);
    const [paginaPerfumistas, setPaginaPerfumistas] = useState(1);

    const perfumesPaginados = perfumes.slice(
        (paginaPerfumes - 1) * ITEMS_POR_PAGINA,
        paginaPerfumes * ITEMS_POR_PAGINA
    );
    
    const perfumistasPaginados = perfumistas.slice(
        (paginaPerfumistas - 1) * ITEMS_POR_PAGINA,
        paginaPerfumistas * ITEMS_POR_PAGINA
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    className={`btn ${vistaActual === "perfumes"
                        ? "btn-primary text-primary-content"
                        : "btn-outline border-base-content/30 text-base-content hover:border-primary hover:bg-base-200"
                        }`}
                    onClick={() => onCambiarVista("perfumes")}
                >
                    Gestionar perfumes
                </button>
                <button
                    type="button"
                    className={`btn ${vistaActual === "perfumistas"
                        ? "btn-primary text-primary-content"
                        : "btn-outline border-base-content/30 text-base-content hover:border-primary hover:bg-base-200"
                        }`}
                    onClick={() => onCambiarVista("perfumistas")}
                >
                    Gestionar perfumistas
                </button>
            </div>

            {vistaActual === "perfumes" ? (
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Perfumes</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Perfume</th>
                                    <th>Marca</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {perfumesPaginados.map((perfume) => (
                                    <tr key={perfume.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        {perfume.foto ? (
                                                            <img src={perfume.foto} alt={`Perfume ${perfume.nombre}`} />
                                                        ) : (
                                                            <div className="bg-neutral text-neutral-content flex h-12 w-12 items-center justify-center">
                                                                {String(perfume.nombre || "?").charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{perfume.nombre}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <th>
                                            <Link to={`/perfume/${perfume.id}`} className="btn btn-ghost btn-xs">Detalles</Link>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginacion
                        totalItems={perfumes.length}
                        itemsPorPagina={ITEMS_POR_PAGINA}
                        paginaActual={paginaPerfumes}
                        handleCambiarPagina={setPaginaPerfumes}
                    />
                </section>
            ) : (
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Perfumistas</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Perfumista</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {perfumistasPaginados.map((perfumista) => (
                                    <tr key={perfumista.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        {perfumista.foto ? (
                                                            <img src={perfumista.foto} alt={`Perfumista ${perfumista.nombre}`} />
                                                        ) : (
                                                            <div className="bg-neutral text-neutral-content flex h-12 w-12 items-center justify-center">
                                                                {String(perfumista.nombre || "?").charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{perfumista.nombre}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <th>
                                            <Link to={`/perfumista/${perfumista.id}`} className="btn btn-ghost btn-xs">Detalles</Link>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginacion
                        totalItems={perfumistas.length}
                        itemsPorPagina={ITEMS_POR_PAGINA}
                        paginaActual={paginaPerfumistas}
                        handleCambiarPagina={setPaginaPerfumistas}
                    />
                </section>
            )}
        </div>
    );
}