import React, { useState } from "react";

const availableNotes = [
  'Vainilla', 'Bergamota', 'Sándalo', 'Almizcle', 'Cedro', 
  'Rosa', 'Jazmin', 'Naranja roja', 'Lavanda', 'Canela', 'Caramelo'
];

const availanbleOlfatoryFamily = [
  'Cítrico', 'Oriental', 'Floral', 'Gourmand', 'Amaderado'
];

export default function PerfumeForm() {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);

  const toggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
        // Quita del array la nota que acabamos de deseleccionar
        // "item" es cada nota del array, si no es la que queremos quitar, se queda
        setSelectedNotes(selectedNotes.filter(item => item !== note));
    } else {
        setSelectedNotes([...selectedNotes, note]);
    }
  };

  const toggleFamily = (family: string) => {
    if (selectedNotes.includes(family)) {
        // Quita del array la familia que acabamos de deseleccionar
        // "item" es cada familia del array, si no es la que queremos quitar, se queda
        setSelectedFamilies(selectedFamilies.filter(item => item !== family));
    } else {
        setSelectedFamilies([...selectedFamilies, family]);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-95 shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label text-neutral">Nombre</label>
            <input type="text" className="input" placeholder="Nombre" />

            <span className="label">Marca</span>
            <label className="select">
              <select>
                <option disabled selected>Selecciona una marca</option>
                <option>Xerjoff</option>
                <option>Valentino</option>
                <option>ELDO</option>
              </select>
            </label>

            <label className="label text-neutral">Descripción</label>
            <textarea className="textarea" placeholder="Descripción"></textarea>

            <div className="divider">Información general</div>

            {/* Notas */}
            <label className="label text-neutral">Notas</label>
            <div className="dropdown mb-4">
              <label tabIndex={0} className="btn btn-outline w-full justify-between">
                {selectedNotes.length > 0
                  ? selectedNotes.map(note => (
                      <span key={note} className="badge badge-primary mr-1">{note}</span>
                    ))
                  : "Selecciona notas"}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
              >
                {availableNotes.map(note => (
                  <li key={note}>
                    <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedNotes.includes(note)}
                        onChange={() => toggleNote(note)}
                        className="checkbox checkbox-primary"
                      />
                      {note}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Familias olfativas */}
            <label className="label text-neutral">Familias olfativas</label>
            <div className="dropdown mb-4">
              <label tabIndex={0} className="btn btn-outline w-full justify-between">
                {selectedFamilies.length > 0
                  ? selectedFamilies.map(family => (
                      <span key={family} className="badge badge-secondary mr-1">{family}</span>
                    ))
                  : "Selecciona familias"}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
              >
                {availanbleOlfatoryFamily.map(family => (
                  <li key={family}>
                    <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFamilies.includes(family)}
                        onChange={() => toggleFamily(family)}
                        className="checkbox checkbox-secondary"
                      />
                      {family}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-neutral mt-2 hover:btn-neutral text-primary-content">
              Guardar
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}