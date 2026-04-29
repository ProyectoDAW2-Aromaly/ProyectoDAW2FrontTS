import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { PerfumeCard } from "../../components/PerfumeCard";
import { getListDetail, type IListaDetalle } from "../../servicios/listas.services";

export default function ListDetailPage() {
  const { idLista } = useParams();
  const [lista, setLista] = useState<IListaDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <Link to="/lists" className="btn mt-4">Volver a listas</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 mt-25 mb-20">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to="/lists" className="link text-sm">Volver a listas</Link>
          <h1 className="text-4xl font-semibold mt-3">{lista.nombre}</h1>
          <p className="opacity-70 mt-2">
            Lista de {lista.creadorUsername} - {lista.totalPerfumes} perfumes - {lista.esPublica ? "Publica" : "Privada"}
          </p>
        </div>
      </div>

      {lista.perfumes.length === 0 ? (
        <p className="opacity-70">Esta lista todavia no tiene perfumes.</p>
      ) : (
        <div className="flex flex-wrap gap-12">
          {lista.perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} data={perfume} />
          ))}
        </div>
      )}
    </div>
  );
}
