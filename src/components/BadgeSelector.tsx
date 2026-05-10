import { useState } from "react";

type Props = {
    items: string[];
    label: string;
    size?: "xs" | "md";
    selected: string[];
    onChange: (items: string[]) => void;
};

export const BadgeSelector = ({ items = [], label, size = "md", selected = [], onChange }: Props) => {
    const [busqueda, setBusqueda] = useState("");
    const selectedItems = selected ?? [];

    const sizeContenedor = size === "xs"
        ? "py-1 text-xs"
        : "py-2 text-base";

    // toggle: Cambio entre estados (on/off, true/false, seleccionado/no seleccionado)
    const toggle = (item: string) => {
        if (selected.includes(item)) {
            // Quita del array la nota que acabamos de seleccionar
            // "item" es cada nota del array, si no es la que queremos quitar, se queda
            // Si ya lo tengo seleccionado, crea un array sin ese item
            onChange(selected.filter(it => it !== item))
        } else {
            // Si no está seleccionado, añadelo al array
            onChange([...selected, item]);
        }
    };

    const itemsFiltrados = items.filter(item => 
        // Guarda solo los items que contienen lo que escribo
        item?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="dropdown w-full">
            <label tabIndex={0} className={`w-full flex flex-wrap gap-2 justify-start h-auto rounded-field cursor-pointer py-2 bg-transparent border-2 border-neutral/20 pl-2 ${sizeContenedor}`}>
                <div className="flex flex-wrap gap-2">
                    {selected.length > 0
                        ? selected.map(item => (
                            <span key={item} className="badge badge-sm badge-neutral text-primary-content ml-1">{item}</span>
                        ))
                        : label}
                </div>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
            >

                <li className="mb-2">
                    <input 
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        // Cuando cambio algo en el imput, se dispara. e.target.value, lo que se va escribiendo
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input input-sm input-bordered w-full"
                    />
                </li>

                {itemsFiltrados.map(item => (
                    <li key={item}>
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item)}
                                // Si estaba el item lo quita, si no, lo añade
                                onChange={() => toggle(item)}
                                className="checkbox checkbox-primary"
                            />
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}