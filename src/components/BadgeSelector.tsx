import React, { useState } from "react";

type Props = {
    items: string[];
    label: string;
};

export const BadgeSelector = ({ items, label }: Props) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggle = (item: string) => {
        if (selectedItems.includes(item)) {
            // Quita del array la nota que acabamos de deseleccionar
            // "item" es cada nota del array, si no es la que queremos quitar, se queda
            const newSelectedItems = selectedItems.filter(it => it !== item);
            setSelectedItems(newSelectedItems);
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <div className="dropdown">
            <label tabIndex={0} className="w-full flex flex-wrap gap-2 justify-start h-auto rounded-field cursor-pointer py-2 bg-transparent border-2 border-neutral/20 pl-2">
                <div className="flex flex-wrap gap-2">
                    {selectedItems.length > 0
                        ? selectedItems.map(item => (
                            <span key={item} className="badge badge-sm badge-neutral text-primary-content ml-1">{item}</span>
                        ))
                        : label}
                </div>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
            >
                {items.map(item => (
                    <li key={item}>
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item)}
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