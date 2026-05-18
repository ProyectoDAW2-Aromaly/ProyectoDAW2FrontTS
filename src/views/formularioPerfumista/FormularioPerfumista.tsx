import { useFormularioPerfumistaViewModel } from "./useFormularioPerfumistaViewModel";

export default function FormularioPerfumista() {

    const {
        esModoEdicion,
        formulario,
        previewFoto,
        loading,
        error,
        guardando,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancelar
    } = useFormularioPerfumistaViewModel();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        // ! py -> Padding vertical. px -> Padding horizontal. Lo mismo con mx y my pero con margin.
        <div className="min-h-screen bg-base-200/30 flex justify-center items-start py-20 px-4">
            <div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-2xl p-6">
                <div className="card-body">

                    <h1 className="font-semibold text-lg text-center mb-6">
                        {esModoEdicion ? "EDITAR PERFUMISTA" : "NUEVO PERFUMISTA"}
                    </h1>

                    {/* FIXME: PRUEBA */}
                    {error && <div className="alert alert-error mb-4">{error}</div>}

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* IZQUIERDA */}
                        <div className="space-y-3">
                            <label className="label text-neutral font-semibold">Nombre</label>
                            <input
                                type="text"
                                className="input w-full focus:outline-none"
                                placeholder="Nombre"
                                value={formulario.nombre}
                                onChange={handleChange("nombre")}
                            />
                        </div>

                        {/* DERECHA */}
                        <div className="space-y-3">
                            <label className="label text-neutral font-semibold">Foto del perfumista</label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 rounded-full">
                                    <img src={previewFoto || "/placeholder.jpg"} alt="Vista previa del perfumista" />
                                </div>
                                <input
                                    type="file"
                                    className="file-input w-full"
                                    onChange={handleFileChange}
                                />
                            </div>

                        </div>

                    </div>
                    {/* DESCRIPCIÓN */}
                    <label className="label text-neutral font-semibold">Descripción</label>
                    <textarea
                        className="textarea w-full focus:outline-none"
                        placeholder="Descripción"
                        value={formulario.descripcion}
                        onChange={handleChange("descripcion")}
                    ></textarea>
                    
                    <div className="flex gap-4 justify-end mt-3">
                        <button
                            className="btn"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn btn-neutral hover:hover:btn-accent text-primary-content"
                            onClick={handleSubmit}
                            disabled={guardando}
                        >
                            {guardando && <span className="loading loading-spinner"></span>}
                            {esModoEdicion ? "Actualizar perfumista" : "Crear perfumista"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}