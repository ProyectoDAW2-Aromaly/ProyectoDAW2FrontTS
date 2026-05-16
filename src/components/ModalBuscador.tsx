import { useEffect, useState } from "react";
import { buscarPerfumes } from "../services/perfume.services";
import { IPerfumeBuscar } from "../interfaces/IPerfume";
import { useNavigate } from "react-router";

export default function ModalBuscador() {
    const [buscar, setBuscar] = useState("");
    const [resultados, setResultados] = useState<IPerfumeBuscar[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (buscar.length < 2) return;

        const timeout = setTimeout(() => {
            buscarPerfumes(buscar)
                .then(setResultados)
                .catch(console.error);
        }, 300);

        return () => clearTimeout(timeout);
    }, [buscar]);

    return (
        <dialog id="search_modal" className="modal items-start">
            <div className="modal-box relative mt-20 p-3 w-11/12 max-w-6xl">

                <label className="input flex items-center gap-2 w-full">
                    <input
                        type="search"
                        placeholder="Buscar perfume..."
                        className="grow"
                        value={buscar}
                        onChange={(e) => {
                            const value = e.target.value;
                            setBuscar(value);

                            if (value.length < 2) {
                                setResultados([]);
                            }
                        }}
                    />
                </label>

                {resultados.length > 0 && (
                    <ul className="mt-3 bg-base-200 rounded-box">
                        {resultados.map((p) => (
                            <li
                                key={p.id}
                                onClick={() => {
                                    const modal = document.getElementById("search_modal") as HTMLDialogElement;
                                    modal?.close();

                                    setBuscar("");
                                    setResultados([]);

                                    navigate(`/perfume/${p.id}`);
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-base-300 cursor-pointer"
                            >
                                <img src={p.foto} className="w-8 h-8 rounded" />
                                <span>{p.nombre}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}