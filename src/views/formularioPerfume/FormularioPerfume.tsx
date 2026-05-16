import { BadgeSelector } from "../../components/BadgeSelector";
import { useFormularioPerfumeViewModel } from "./useFormularioPerfumeViewModel";
import { GENEROS } from "../../constantes/constantes";
import { IFamilias, INotaBackend } from "../../interfaces/IPerfume";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";

export default function FormularioPerfume() {

  const {
    esModoEdicion,
    formulario,
    loading,
    error,
    guardando,
    opcionesSelectores,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleCancelar
  } = useFormularioPerfumeViewModel();

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
            {esModoEdicion ? "EDITAR PERFUME" : "NUEVO PERFUME"}
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
                onChange={(e) => handleChange("nombre", e.target.value)}
              />

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Marca</label>
                <select
                  className="select w-full"
                  value={
                    typeof formulario.marca === 'object'
                      ? formulario.marca.nombre
                      : (formulario.marca ?? "")
                  }
                  onChange={(e) => {
                    const nuevaMarca = opcionesSelectores.marca.find(m => m.nombre === e.target.value)
                    if (nuevaMarca)
                      handleChange("marca", nuevaMarca)
                  }}
                >
                  <option value="" disabled selected>Selecciona una marca</option>
                  {opcionesSelectores.marca.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                </select>
              </div>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Fecha de lanzamiento</label>
                <input
                  type="number"
                  className="input w-full focus:outline-none"
                  placeholder="Año de lanzamiento"
                  value={formulario.fechaLanzamiento}
                  onChange={(e) => handleChange("fechaLanzamiento", e.target.value)}
                  min={1800}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            {/* DERECHA */}
            <div className="space-y-3">
              <span className="label text-neutral font-semibold">Género</span>
              <select
                className="select w-full"
                value={formulario.genero}
                onChange={(e) => handleChange("genero", e.target.value)}
              >
                <option disabled value="">Selecciona un género</option>
                {GENEROS.map(genero => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold focus:outline-none">Perfumista/s</label>
                <BadgeSelector<IPerfumistaBackend>
                  items={opcionesSelectores.perfumista}
                  selected={formulario.perfumistas ?? []}
                  onChange={(nuevos) => handleChange("perfumistas", nuevos)}
                  placeholder="Selecciona los perfumistas"
                  getIdentifier={(val) => val.id ?? ""}
                  getLabel={(val) => val.nombre}
                />
              </div>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Colección</label>
                <input
                  type="text"
                  className="input w-full focus:outline-none"
                  placeholder="Colección"
                  value={formulario.coleccion}
                  onChange={(e) => handleChange("perfumistas", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="label text-neutral font-semibold">Familia Olfativa</label>
            <BadgeSelector<IFamilias>
              items={opcionesSelectores.familia}
              selected={formulario.familiasOlfativas ?? []}
              onChange={(nuevos) => handleChange("familiasOlfativas", nuevos)}
              placeholder="Selecciona las familias"
              getIdentifier={(val) => val.nombre}
              getLabel={(val) => val.nombre}
            />
          </div>

          {/* DESCRIPCIÓN */}
          <label className="label text-neutral font-semibold">Descripción</label>
          <textarea
            className="textarea w-full focus:outline-none"
            placeholder="Descripción"
            value={formulario.descripcion}
            onChange={(e) => handleChange("perfumistas", e.target.value)}
          ></textarea>

          <label className="label text-neutral font-semibold">Foto del perfume</label>
          <input
            type="file"
            className="file-input w-full"
            onChange={handleFileChange}
          />

          {/* Notas */}
          <div className="divider font-semibold">NOTAS</div>

          <label className="label text-neutral font-semibold">Salida</label>
          {(["salida", "corazon", "base"] as ("salida" | "corazon" | "base")[]).map((tipo) =>
            <BadgeSelector<INotaBackend>
              items={opcionesSelectores.nota.map((nota) => { return { ...nota, tipo } })}
              selected={formulario.notas ?? []}
              onChange={(nuevos) => handleChange("notas", nuevos)}
              placeholder={"Selecciona las notas de " + tipo}
              getIdentifier={(val) => val.nombre}
              getLabel={(val) => val.nombre}
            />)}

          <div className="flex gap-10">
            <button
              className="btn btn-neutral flex-2 mt-2 hover:btn-accent text-primary-content"
              onClick={handleSubmit}
              disabled={guardando}
            >
              {guardando && <span className="loading loading-spinner"></span>}
              {esModoEdicion ? "Actualizar perfume" : "Crear perfume"}
            </button>
            <button
              className="btn btn-neutral flex-2 mt-2 hover:hover:bg-red-500 hover:border-red-500 text-primary-content"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}