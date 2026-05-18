import { useEffect, useState } from "react";
import { Buscador } from "./Buscador";
import { IFamilias, INotaBackend, TGenero } from "../interfaces/IPerfume";
import { obtenerNotas } from "../services/nota.services";
import { obtenerFamiliasOlfativas } from "../services/familia.services";

const generos = [
    'Mujer', 'Hombre', "Unisex"
]

interface IFiltroPanel {
    aplicarFiltros: (nombre: string, familias: IFamilias[], notas: INotaBackend[], genero?: TGenero) => void
}

const DisabledOption = ({ label }: { label: string }) => <option disabled value="">
    {label}
</option>;
const SELECT_CLASS = "select select-sm w-60"

export const FiltroPanel = ({ aplicarFiltros }: IFiltroPanel) => {
    const [notasDisponibles, setNotasDisponibles] = useState<INotaBackend[]>([])
    const [familiasOlfativasDisponibles, setFamiliasOlfativasDisponibles] = useState<IFamilias[]>([])
    // Estas cosas como tipo en vez de string deben ser el objeto relacionado
    const [selectedNote, setSelectedNote] = useState<INotaBackend>();
    const [selectedOlfactoryFamily, setSelectedOlfactoryFamily] = useState<IFamilias>();
    const [selectedGenre, setSelectedGenre] = useState<string>();
    const [nombre, setNombre] = useState("");

    const buscar = () => {
        aplicarFiltros(
            nombre,
            selectedOlfactoryFamily,
            selectedNote,
            selectedGenre
        )
    }

    // const sacarDatosDisponibles = async () => {
    //     const notas = await obtenerNotas();
    //     const familias = await obtenerFamiliasOlfativas();
    //     setNotasDisponibles(notas)
    //     setFamiliasOlfativasDisponibles(familias)
    // }

    // useEffect(() => {
    //     sacarDatosDisponibles()
    // }, []);

    return (
        <div className="card bg-base-100 shadow-sm w-full mt-10 p-4 mb-10 gap-4">
            <Buscador value={nombre} onChange={setNombre} />
            <div className="flex flex-row flex-wrap gap-4 justify-evenly">
                <select className={SELECT_CLASS} defaultValue="" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <DisabledOption label="Selecciona el género" />

                    {generos.map((item: string) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select className={SELECT_CLASS} defaultValue="" value={selectedOlfactoryFamily} onChange={(e) => setSelectedOlfactoryFamily(e.target.value)}>
                    <DisabledOption label="Selecciona una familia olfativa" />

                    {familiasOlfativasDisponibles.map((item: string) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select className={SELECT_CLASS} defaultValue="" value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)}>
                    <DisabledOption label="Selecciona una nota" />
                    {notasDisponibles.map((item: string) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-2">
                    <button className="btn btn-neutral btn-sm hover:hover:btn-accent text-primary-content" onClick={buscar}>Buscar</button>

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
        </div>
    );
};
