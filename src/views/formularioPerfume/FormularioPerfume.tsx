import { BadgeSelector } from "../../components/BadgeSelector";

const notasDisponibles = [
  'Vainilla', 'Bergamota', 'Sándalo', 'Almizcle', 'Cedro',
  'Rosa', 'Jazmin', 'Naranja roja', 'Lavanda', 'Canela', 'Caramelo'
];

const familiasDisponible = [
  'Cítrico', 'Oriental', 'Floral', 'Gourmand', 'Amaderado'
];

const generos = [
  'Mujer', 'Hombre', "Unisex"
]

const perfumistasDisponibles = [
  'Chris Maurice', 'Honorine Blanc', 'Amadine Clerc-Marie', 'Quentin Bisch'
]

const coleccionesDisponibles = [
  'Sin colección', 'Born in Roma', 'Coleccion 1', 'Colección 2'
]

export default function FormularioPerfume() {
  
  return (
    // ! py -> Padding vertical. px -> Padding horizontal. Lo mismo con mx y my pero con margin.
    <div className="min-h-screen bg-base-200/30 flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">

          <h1 className="font-semibold text-lg text-center mb-6">FORMULARIO PERFUME</h1>

          <div className="grid md:grid-cols-2 gap-4">
            {/* IZQUIERDA */}
            <div className="space-y-3">
              <label className="label text-neutral font-semibold">Nombre</label>
              <input type="text" className="input w-full focus:outline-none" placeholder="Nombre" />

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Marca</label>
                <select className="select w-full">
                  <option disabled selected>Marca</option>
                  <option>Xerjoff</option>
                  <option>Valentino</option>
                  <option>ELDO</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Fecha de lanzamiento</label>
                <input type="number" className="input w-full focus:outline-none" placeholder="Año de lanzamiento" min={1800} max={new Date().getFullYear()} />
              </div>
            </div>

            {/* DERECHA */}
            <div className="space-y-3">
              <span className="label text-neutral font-semibold">Género</span>
              <select className="select w-full" defaultValue="">
                <option disabled value="">
                  Selecciona un género
                </option>

                {generos.map(genero => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>

              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold focus:outline-none">Perfumista/s</label>
                <BadgeSelector
                  items={perfumistasDisponibles}
                  label="Selecciona los perfumistas"
                />
              </div>
              
              <div className="space-y-1 flex flex-col">
                <label className="label text-neutral font-semibold">Colección</label>
                <select className="select w-full" defaultValue="">
                  <option disabled value="">
                    Selecciona una colección
                  </option>

                  {coleccionesDisponibles.map(coleccion => (
                    <option key={coleccion} value={coleccion}>
                      {coleccion}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="label text-neutral font-semibold">Familia Olfativa</label>
            <BadgeSelector
              items={familiasDisponible}
              label="Selecciona las familias olfativas"
            />
          </div>

          {/* DESCRIPCIÓN */}
          <label className="label text-neutral font-semibold">Descripción</label>
          <textarea className="textarea w-full focus:outline-none" placeholder="Descripción"></textarea>

          <label className="label text-neutral font-semibold">Foto del perfume</label>
          <input type="file" className="file-input w-full" />

          {/* Notas */}
          <div className="divider font-semibold">NOTAS</div>

          <label className="label text-neutral font-semibold">Salida</label>
          <BadgeSelector
            items={notasDisponibles}
            label="Selecciona las notas de salida"
          />

          <label className="label text-neutral font-semibold">Corazón</label>
          <BadgeSelector
            items={notasDisponibles}
            label="Selecciona las notas corazón"
          />

          <label className="label text-neutral font-semibold">Base</label>
          <BadgeSelector
            items={notasDisponibles}
            label="Selecciona las notas base"
          />

          <div className="flex gap-10">
            <button className="btn btn-neutral flex-2 mt-2 hover:btn-accent text-primary-content">
              Guardar
            </button>
            <button className="btn btn-neutral flex-2 mt-2 hover:hover:btn-accent text-primary-content">
              Cancelar
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}