import { useState } from "react";
import { Link } from "react-router";
import { ICreateListFormProps } from "../../interfaces/IPerfil";
import { FormError } from "../../components/FormError";

const MAX_NOMBRE_LISTA_LENGTH = 50;

export default function CreateListForm({
    loading,
    userRol,
    onCreate,
}: ICreateListFormProps) {
    const [nombre, setNombre] = useState("");
    const [esPublica, setEsPublica] = useState(true);
    const [error, setError] = useState<string | string[] | undefined>();
    const esUsuarioBasico = userRol === "BASICO";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(undefined);

        if (esUsuarioBasico) return;


        const nombreLimpio = nombre.trim();

        if (!nombreLimpio) {
            setError("El nombre de la lista es obligatorio.");
            return;
        }

        if (nombreLimpio.length > MAX_NOMBRE_LISTA_LENGTH) {
            setError(`El nombre de la lista no puede superar ${MAX_NOMBRE_LISTA_LENGTH} caracteres.`);
            return;
        }


        try {
            await onCreate({ nombre: nombreLimpio, esPublica });
            setNombre("");
            setEsPublica(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo crear la lista.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Crear lista</h2>

                <label className="label text-neutral font-semibold">Nombre</label>
                <input
                    type="text"
                    className={`input w-full focus:outline-none ${error && (!nombre.trim() || nombre.trim().length > MAX_NOMBRE_LISTA_LENGTH) ? "input-error" : ""}`}
                    value={nombre}
                    onChange={(e) => {
                        setError(undefined);
                        setNombre(e.target.value);
                    }}
                    placeholder="Ej: Favoritos de invierno"
                    disabled={esUsuarioBasico}
                    aria-invalid={Boolean(error && (!nombre.trim() || nombre.trim().length > MAX_NOMBRE_LISTA_LENGTH))}
                />
                <div className={`flex justify-end text-xs ${nombre.trim().length > MAX_NOMBRE_LISTA_LENGTH ? "text-error" : "opacity-70"}`}>
                    {nombre.trim().length}/{MAX_NOMBRE_LISTA_LENGTH}
                </div>

                <label className="label cursor-pointer justify-start gap-3 mt-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={esPublica}
                        onChange={(e) => setEsPublica(e.target.checked)}
                        disabled={esUsuarioBasico}
                    />
                    <span className="label-text">Lista pública</span>
                </label>


                <FormError message={error} />

                <div className="flex justify-end mt-3">
                    {esUsuarioBasico ? (
                        <Link to="/premium" className="btn btn-accent text-primary-content">
                            Actualiza a premium
                        </Link>
                    ) : (
                        <button type="submit" className="btn btn-neutral hover:hover:btn-accent text-primary-content" disabled={loading}>
                            {loading ? "Creando..." : "Crear lista"}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
