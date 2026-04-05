import { useState } from "react";
import { SelectFilter } from "./SelectFilter";

const brands = [
    "Xerjoff", "Valentino", "ELDO"
];

const notes = [
    'Vainilla', 'Bergamota', 'Sándalo', 'Almizcle', 'Cedro',
    'Rosa', 'Jazmin', 'Naranja roja', 'Lavanda', 'Canela', 'Caramelo'
];

const olfactoryFamilies = [
    'Cítrico', 'Oriental', 'Floral', 'Gourmand', 'Amaderado'
];

const genres = [
    'Female', 'Male', "Unisex"
]

// const perfumers = [
//     'Chris Maurice', 'Honorine Blanc', 'Amadine Clerc-Marie', 'Quentin Bisch'
// ]

// const collecctions = [
//     'Sin colección', 'Born in Roma', 'Coleccion 1', 'Colección 2'
// ]

export const FilterPanel = () => {
    const [selectedBrand, setSelectedBrand] = useState<string>();
    const [selectedNote, setSelectedNote] = useState<string>();
    const [selectedOlfactoryFamily, setSelectedOlfactoryFamily] = useState<string>();
    const [selectedGenre, setSelectedGenre] = useState<string>();
    // const [selectedPerfumer, setSelectedPerfumer] = useState<string>();
    // const [selectedCollection, setSelectedCollection] = useState<string>();

    return (
        <div className="card bg-base-100 shadow-sm w-full mt-10 p-4 flex flex-row flex-wrap gap-4 justify-evenly">

            {/* Marca */}
            <SelectFilter
                label="Selecciona una marca"
                items={brands}
                value={selectedBrand}
                onChange={setSelectedBrand}
            />

            {/* Perfumista */}
            {/* <SelectFilter
                label="Selecciona un/a perfumista"
                items={perfumers}
                value={selectedPerfumer}
                onChange={setSelectedPerfumer}
            /> */}

            {/* Género */}
            <SelectFilter
                label="Selecciona el género"
                items={genres}
                value={selectedGenre}
                onChange={setSelectedGenre}
            />

            {/* Familia olfativa */}
            <SelectFilter
                label="Selecciona una familia olfativa"
                items={olfactoryFamilies}
                value={selectedOlfactoryFamily}
                onChange={setSelectedOlfactoryFamily}
            />

            {/* Colección TODO: No sé si ponerlo o no, creo que es complicado porque dependería de la marca*/}
            {/* <SingleSelect
                label="Selecciona una colección"
                items={collecctions}
                value={selectedCollection}
                onChange={setSelectedCollection}
            /> */}

            {/* Nota */}
            <SelectFilter
                label="Selecciona una nota"
                items={notes}
                value={selectedNote}
                onChange={setSelectedNote}
            />

            <div className="flex flex-col">
                <button className="btn btn-neutral btn-sm hover:hover:btn-accent text-primary-content">Buscar</button>
                <a className="link link-accent text-xs mt-2">Resetear filtro</a>
            </div>
            
        </div>
    );
};