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
        handleCancelar,
        erroresCampos
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

                    {error && <div className="alert alert-error mb-4">{error}</div>}

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* IZQUIERDA */}
                        <div className="space-y-3">
                            <label className="label text-neutral font-semibold">Nombre <span className="text-error">*</span></label>
                            <input
                                type="text"
                                className={"input w-full focus:outline-none" + (erroresCampos.nombre ? " input-error" : "")}
                                placeholder="Nombre"
                                value={formulario.nombre}
                                onChange={handleChange("nombre")}
                            />
                            {erroresCampos.nombre && <span className="text-error text-xs">{erroresCampos.nombre}</span>}
                        </div>
                        
                        {/* DERECHA */}
                        <div className="space-y-3">
                            <label className="label text-neutral font-semibold">Foto del perfumista <span className="text-error">*</span></label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 rounded-full">
                                    <img src={previewFoto || "/placeholder.jpg"} alt="Vista previa del perfumista" />
                                </div>
                                <input
                                    type="file"
                                    className={"file-input w-full" + (erroresCampos.imagen ? " input-error" : "")}
                                    onChange={handleFileChange}
                                />
                            </div>

                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <label className="label text-neutral font-semibold">Descripción <span className="text-error">*</span></label>
                    <textarea
                        className={"textarea w-full focus:outline-none" + (erroresCampos.descripcion ? " input-error" : "")}
                        placeholder="Descripción"
                        value={formulario.descripcion}
                        onChange={handleChange("descripcion")}
                    ></textarea>
                    {erroresCampos.descripcion && <span className="text-error text-xs">{erroresCampos.descripcion}</span>}

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