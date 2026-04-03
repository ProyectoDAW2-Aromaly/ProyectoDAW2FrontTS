import { BadgeSelector } from "../../components/BadgeSelector";

const availableNotes = [
  'Vainilla', 'Bergamota', 'Sándalo', 'Almizcle', 'Cedro', 
  'Rosa', 'Jazmin', 'Naranja roja', 'Lavanda', 'Canela', 'Caramelo'
];

const availableOlfatoryFamily = [
  'Cítrico', 'Oriental', 'Floral', 'Gourmand', 'Amaderado'
];

const genre = [
  'Female', 'Male', "Unisex"
]

const availablePerfumer = [
  'Chris Maurice', 'Honorine Blanc', 'Amadine Clerc-Marie', 'Quentin Bisch'
]

const availableColecction = [
  'Sin colección', 'Born in Roma', 'Coleccion 1', 'Colección 2'
]

export default function PerfumeForm() {
  return (
    // ! py -> Padding vertical. px -> Padding horizontal. Lo mismo con mx y my pero con margin.
    <div className="hero bg-base-200 min-h-screen flex justify-center items-start py-20">
      <div className="card bg-base-100 w-95 shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="flex justify-center">
            <h1 className="font-semibold text-lg">FORMULARIO PERFUME</h1>
          </div>
          
          <fieldset className="fieldset">
            
            <label className="label text-neutral font-semibold">Nombre</label>
            <input type="text" className="input" placeholder="Nombre" />

            <span className="label text-neutral font-semibold">Marca</span>
            <label className="select">
              <select>
                <option disabled selected>Selecciona una marca</option>
                <option>Xerjoff</option>
                <option>Valentino</option>
                <option>ELDO</option>
              </select>
            </label>

            <label className="label text-neutral font-semibold">Descripción</label>
            <textarea className="textarea" placeholder="Descripción"></textarea>

            <div className="divider font-semibold">INFORMACIÓN GENERAL</div>

            {/* Familias olfativas */}
            <label className="label text-neutral font-semibold">Familia Olfativa</label>
            <BadgeSelector
              items={availableOlfatoryFamily}
              label="Selecciona las familias olfativas"
            />

            <span className="label text-neutral font-semibold">Género</span>
            <label className="select">
              <select defaultValue="">
                <option disabled value="">
                  Selecciona un género
                </option>

                {genre.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className="label text-neutral font-semibold">Perfumista</label>
            <BadgeSelector
              items={availablePerfumer}
              label="Selecciona los perfumistas"
            />

            <label className="label text-neutral font-semibold">Fecha de lanzamiento</label>
            <input type="number" className="input" placeholder="Año de lanzamiento" min={1800} max={new Date().getFullYear()} />

            <span className="label text-neutral font-semibold">Colección</span>
            <label className="select">
              <select defaultValue="">
                <option disabled value="">
                  Selecciona una colección
                </option>

                {availableColecction.map(colecction => (
                  <option key={colecction} value={colecction}>
                    {colecction}
                  </option>
                ))}
              </select>
            </label>

            {/* Notas */}
            <div className="divider font-semibold">NOTAS</div>
            
            <label className="label text-neutral font-semibold">Salida</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas de salida"
            />

            <label className="label text-neutral font-semibold">Corazón</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas corazón"
            />

            <label className="label text-neutral font-semibold">Base</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas base"
            />

            <button className="btn btn-neutral mt-2 hover:btn-accent text-primary-content">
              Guardar
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}