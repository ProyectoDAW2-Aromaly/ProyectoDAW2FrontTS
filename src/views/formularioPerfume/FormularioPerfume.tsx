import { BadgeSelector } from "../../components/BadgeSelector";
import { useFormularioPerfumeViewModel } from "./useFormularioPerfumeViewModel";

const generos = [
  'Mujer', 'Hombre', "Unisex"
]

export default function FormularioPerfume() {

  const {
    esModoEdicion,
    formulario,
    loading,
    error,
    guardando,
    marcasDisponibles,
    notasDisponibles,
    perfumistasDisponibles,
    familiasDisponibles,
    coleccionesDisponibles,
    notasSeleccionadas,
    perfumistasSeleccionados,
    familiasSeleccionadas,
    handleChange,
    handleFamiliasChange,
    handleNotasChange,
    handlePerfumistasChange,
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
              <input type="text" className="input w-full focus:outline-none" placeholder="Nombre" value={formulario.nombre} onChange={handleChange("nombre")} />

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Marca</label>
                <select
                  className="select w-full"
                  value={
                    typeof formulario.marca === 'object'
                    ? formulario.marca.nombre
                    : (formulario.marca ?? "")
                  }
                  onChange={handleChange("marca")}
                >
                  <option value="" disabled selected>Selecciona una marca</option>
                  {marcasDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Fecha de lanzamiento</label>
                <input 
                  type="number" 
                  className="input w-full focus:outline-none" 
                  placeholder="Año de lanzamiento" 
                  value={formulario.fechaLanzamiento} 
                  onChange={handleChange("fechaLanzamiento")} 
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
                onChange={handleChange("genero")}
              >
                <option disabled value="">Selecciona un género</option>
                {generos.map(genero => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold focus:outline-none">Perfumista/s</label>
                <BadgeSelector
                  items={perfumistasDisponibles.map(p => p.nombre)}
                  selected={perfumistasSeleccionados}
                  onChange={handlePerfumistasChange}
                  label="Selecciona los perfumistas"
                />
              </div>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Colección</label>
                <select 
                  className="select w-full" 
                  value={formulario.coleccion}
                  onChange={handleChange("coleccion")}
                >
                  <option value="">Sin colección</option>
                  {coleccionesDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="label text-neutral font-semibold">Familia Olfativa</label>
            <BadgeSelector
              items={familiasDisponibles}
              selected={familiasSeleccionadas}
              onChange={handleFamiliasChange}
              label="Selecciona las familias"
            />
          </div>

          {/* DESCRIPCIÓN */}
          <label className="label text-neutral font-semibold">Descripción</label>
          <textarea 
            className="textarea w-full focus:outline-none" 
            placeholder="Descripción"
            value={formulario.descripcion}
            onChange={handleChange("descripcion")}
          ></textarea>

          <label className="label text-neutral font-semibold">Foto del perfume</label>
          <input type="file" className="file-input w-full" />

          {/* Notas */}
          <div className="divider font-semibold">NOTAS</div>

          <label className="label text-neutral font-semibold">Salida</label>
          <BadgeSelector
            items={notasDisponibles}
            selected={notasSeleccionadas("salida")}
            onChange={handleNotasChange("salida")}
            label="Selecciona las notas de salida"
          />

          <label className="label text-neutral font-semibold">Corazón</label>
          <BadgeSelector
            items={notasDisponibles}
            selected={notasSeleccionadas("corazon")}
            onChange={handleNotasChange("corazon")}
            label="Selecciona las notas corazón"
          />

          <label className="label text-neutral font-semibold">Base</label>
          <BadgeSelector
            items={notasDisponibles}
            selected={notasSeleccionadas("base")}
            onChange={handleNotasChange("base")}
            label="Selecciona las notas base"
          />

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
              className="btn btn-neutral flex-2 mt-2 hover:hover:btn-accent text-primary-content"
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