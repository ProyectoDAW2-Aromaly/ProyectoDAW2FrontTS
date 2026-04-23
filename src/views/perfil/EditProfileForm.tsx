import { useState } from "react";
import type { IUserProfile } from "./IProfile";

interface IEditProfileFormProps {
  user: IUserProfile;
  loading: boolean;
  onCancel: () => void;
  onSave: (data: { email: string; descripcion: string; foto: string }) => Promise<void>;
}

export default function EditProfileForm({ user, loading, onCancel, onSave }: IEditProfileFormProps) {
  const [email, setEmail] = useState(user.email);
  const [descripcion, setDescripcion] = useState(user.descripcion);
  const [foto, setFoto] = useState(user.pfp);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await onSave({ email, descripcion, foto });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Editar perfil</h2>

        <label className="label text-neutral font-semibold">Email</label>
        <input
          type="email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-neutral font-semibold">Descripción</label>
        <textarea
          className="textarea w-full h-28"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label className="label text-neutral font-semibold">Foto</label>
        <input
          type="text"
          className="input w-full"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          placeholder="/user/profile-pic/profile1.jpg"
        />

        {error && <p className="text-error text-sm">{error}</p>}

        <div className="flex gap-4 justify-end mt-3">
          <button type="button" className="btn" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-neutral" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}
