import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { PerfumeCard } from "../../components/PerfumeCard";
import { getListDetail } from "../../services/listas.services";
import { IListaDetalle } from "../../interfaces/IListas";
import Paginacion from "../../components/Paginacion";

const ITEMS_POR_PAGINA = 12;

export default function ListDetailPage() {
    const { idLista } = useParams();
    const [lista, setLista] = useState<IListaDetalle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [paginaPerfumes, setPaginaPerfumes] = useState(1);

    const perfumesPaginados = lista?.perfumes.slice(
        (paginaPerfumes - 1) * ITEMS_POR_PAGINA,
        paginaPerfumes * ITEMS_POR_PAGINA
    );

    useEffect(() => {
        const loadLista = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(idLista);
                if (!id) {
                    throw new Error("Lista no valida");
                }

                const listaData = await getListDetail(id);
                setLista(listaData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "No se pudo cargar la lista");
            } finally {
                setLoading(false);
            }
        };

        loadLista();
    }, [idLista]);

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 mt-25">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error || !lista) {
        return (
            <div className="mx-auto max-w-4xl px-4 mt-25">
                <div className="alert alert-error">{error || "No se pudo cargar la lista"}</div>
                <Link to="/listas" className="btn my-4">Ir a listas</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 mt-25 mb-20">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <Link to="/listas" className="link text-sm">Ir a listas</Link>
                    <span> - </span>
                    <button
                        onClick={() => navigate(-1)}
                        className="link text-sm"
                    >
                        Volver a la página anterior
                    </button>
                    <h1 className="text-4xl font-semibold mt-3">{lista.nombre}</h1>
                    <p className="opacity-70 mt-2">
                        Lista de {lista.creadorUsername} - {lista.totalPerfumes} perfumes - {lista.esPublica ? "Pública" : "Privada"}
                    </p>
                </div>
            </div>

            {lista.perfumes.length === 0 ? (
                <p className="opacity-70">Esta lista todavía no tiene perfumes.</p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-12 mb-10">
                        {perfumesPaginados?.map((perfume) => (
                            <PerfumeCard key={perfume.id} data={perfume} />
                        ))}
                    </div>
                    <Paginacion
                        totalItems={lista.perfumes.length}
                        itemsPorPagina={ITEMS_POR_PAGINA}
                        paginaActual={paginaPerfumes}
                        handleCambiarPagina={setPaginaPerfumes}
                    />
                </>
            )}

        </div>
    );
}
