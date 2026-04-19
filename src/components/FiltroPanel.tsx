import { useState } from "react";
import { SelectFilter } from "./SelectFiltro";
import { useLocation } from "react-router";
import { BadgeSelector } from "./BadgeSelector";

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
    'Mujer', 'Hombre', "Unisex"
]

export const FilterPanel = () => {
    const location = useLocation();

    const [selectedBrand, setSelectedBrand] = useState<string>();
    const [selectedGenre, setSelectedGenre] = useState<string>();

    return (
        <div className="card bg-base-100 shadow-sm w-full mt-10 p-4 mb-10 gap-4">
            <label className="input w-full max-w-6xl mx-auto flex items-center gap-2 mb-6">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input className="w-full" type="search" required placeholder="Buscar" />
            </label>

            {location.pathname !== "/brands" && (

                <div className=" flex flex-row flex-wrap gap-4 justify-evenly">

                    {/* Marca */}
                    {location.pathname !== "/brand" && (
                        <SelectFilter
                            label="Selecciona una marca"
                            items={brands}
                            value={selectedBrand}
                            onChange={setSelectedBrand}
                        />
                    )}

                    {/* Género */}
                    <SelectFilter
                        label="Selecciona el género"
                        items={genres}
                        value={selectedGenre}
                        onChange={setSelectedGenre}
                    />

                    {/* Familia olfativa */}
                    <div className="flex-1">
                        <BadgeSelector
                            label="Selecciona una familia olfativa"
                            items={olfactoryFamilies}
                            size="xs"
                        />
                    </div>

                    {/* Nota */}
                    <div className="flex-1">
                        <BadgeSelector
                            label="Selecciona una nota"
                            items={notes}
                            size="xs"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="btn btn-neutral btn-sm hover:hover:btn-accent text-primary-content">Buscar</button>

                        <div className="tooltip save" data-tip="Resetear filtro">
                            <a href="">
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 15L21 21M21 15L15 21M10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L17 11"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};