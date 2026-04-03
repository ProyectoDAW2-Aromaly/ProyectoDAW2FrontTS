import React, { useState } from "react";

type Props = {
  items: string[];
  label: string;
};

export const BadgeSelector = ({ items, label }: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);

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

//   const toggleFamily = (family: string) => {
//     if (selectedFamilies.includes(family)) {
//         // Quita del array la familia que acabamos de deseleccionar
//         // El filtro recibe una función que ejecuta por cada elemento del array (item) y si es true/false, mete el objeto en un nuevo array newSelectedFamilies
//         // item -> Cada item de la lista.
//         const newSelectedFamilies = selectedFamilies.filter(item => item !== family);
//         setSelectedFamilies(newSelectedFamilies);
//     } else {
//         setSelectedFamilies([...selectedFamilies, family]);
//     }
//   };
    return (
        <div className="dropdown mb-4">
              <label tabIndex={0} className="btn w-full justify-start h-auto py-2">
                <div className="flex flex-wrap gap-2">
                  {selectedItems.length > 0
                  ? selectedItems.map(item => (
                      <span key={item} className="badge badge-primary mr-1">{item}</span>
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