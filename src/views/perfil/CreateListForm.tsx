import { useState } from "react";
import { ICreateListFormProps } from "../../interfaces/IPerfil";

export default function CreateListForm({ loading, onCreate }: ICreateListFormProps) {
  const [nombre, setNombre] = useState("");
  const [esPublica, setEsPublica] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      await onCreate({ nombre, esPublica });
      setNombre("");
      setEsPublica(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la lista");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Crear lista</h2>

        <label className="label text-neutral font-semibold">Nombre</label>
        <input
          type="text"
          className="input w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Favoritos de invierno"
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

        {error && <p className="text-error text-sm">{error}</p>}

        <div className="flex justify-end mt-3">
          <button type="submit" className="btn btn-neutral hover:hover:btn-accent text-primary-content" disabled={loading}>
            {loading ? "Creando..." : "Crear lista"}
          </button>
        </div>
      </div>
    </form>
  );
}
