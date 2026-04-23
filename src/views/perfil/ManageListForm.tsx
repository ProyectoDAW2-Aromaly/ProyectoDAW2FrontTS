import { useState } from "react";
import type { IListaPerfil } from "./IProfile";

interface IManageListFormProps {
  lista: IListaPerfil;
  loading: boolean;
  onSave: (data: { nombre: string; esPublica: boolean }) => Promise<void>;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export default function ManageListForm({ lista, loading, onSave, onDelete, onCancel }: IManageListFormProps) {
  const [nombre, setNombre] = useState(lista.nombre);
  const [esPublica, setEsPublica] = useState(lista.esPublica);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      await onSave({ nombre, esPublica });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    }
  };

  const handleDelete = async () => {
    setError("");
    try {
      await onDelete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{lista.nombre}</h3>

        <label className="label text-neutral font-semibold">Nombre</label>
        <input
          type="text"
          className="input w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className="label cursor-pointer justify-start gap-3 mt-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={esPublica}
            onChange={(e) => setEsPublica(e.target.checked)}
          />
          <span className="label-text">Lista pública</span>
        </label>

        <p className="text-sm opacity-70">{lista.totalPerfumes} perfumes</p>

        {error && <p className="text-error text-sm">{error}</p>}

        <div className="flex gap-3 justify-end mt-3">
          <button type="button" className="btn" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button type="button" className="btn btn-error btn-outline" onClick={handleDelete} disabled={loading}>
            Borrar
          </button>
          <button type="submit" className="btn btn-neutral" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}
