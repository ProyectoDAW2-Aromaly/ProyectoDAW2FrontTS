import { BadgeSelector } from "../../components/BadgeSelector";

const availableNotes = [
  'Vainilla', 'Bergamota', 'Sándalo', 'Almizcle', 'Cedro', 
  'Rosa', 'Jazmin', 'Naranja roja', 'Lavanda', 'Canela', 'Caramelo'
];

const availanbleOlfatoryFamily = [
  'Cítrico', 'Oriental', 'Floral', 'Gourmand', 'Amaderado'
];


export default function PerfumeForm() {
  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-start py-10">
      <div className="card bg-base-100 w-95 shrink-0 shadow-2xl mt-10">
        <div className="card-body">
          <div className="flex justify-center">
            <h1 className="font-semibold text-lg">FORMULARIO PERFUME</h1>
          </div>
          
          <fieldset className="fieldset">
            
            <label className="label text-neutral font-semibold">NOMBRE</label>
            <input type="text" className="input" placeholder="Nombre" />

            <span className="label text-neutral font-semibold">MARCA</span>
            <label className="select">
              <select>
                <option disabled selected>Selecciona una marca</option>
                <option>Xerjoff</option>
                <option>Valentino</option>
                <option>ELDO</option>
              </select>
            </label>

            <label className="label text-neutral font-semibold">DESCRIPCIÓN</label>
            <textarea className="textarea" placeholder="Descripción"></textarea>

            <div className="divider">Información general</div>

            {/* Notas */}
            <h2 className="font-semibold">NOTAS</h2>
            
            <label className="label text-neutral">Salida</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas de salida"
            />

            <label className="label text-neutral">Corazón</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas corazón"
            />

            <label className="label text-neutral">Base</label>
            <BadgeSelector
              items={availableNotes}
              label="Selecciona las notas base"
            />
            

            {/* Familias olfativas */}
            <label className="label text-neutral font-semibold">FAMILIAS OLFATIVAS</label>
            <BadgeSelector
              items={availanbleOlfatoryFamily}
              label="Selecciona la familia olfativa"
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