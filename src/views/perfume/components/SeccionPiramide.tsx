import type { INota } from "../../../interfaces/IPerfume";

export const SeccionPiramide = ({ notas }: { notas: INota[] }) => {
    const tipoLabel: Record<INota["tipo"], string> = {
        salida: "salida",
        corazon: "corazón",
        base: "base",
    };

    const grupoNotas = notas.reduce<Record<INota["tipo"], INota[]>>(
        (acc, nota) => {
            acc[nota.tipo].push(nota);
            return acc;
        },
        { salida: [], corazon: [], base: [] },
    );

    return (
        <>
            <h1 className="text-2xl text-center mb-10 mt-10">PIRAMIDE OLFATIVA</h1>
            <div className="flex flex-wrap gap-12">
                {Object.entries(grupoNotas).map(([tipo, notasTipo]) => (
                    <div className="card bg-base-100 shadow-sm w-96" key={tipo}>
                        <div className="card-body">
                            <h2 className="card-title">{"Notas de " + tipoLabel[tipo as INota["tipo"]]}</h2>

                            <div className="flex flex-wrap gap-6 mb-4">
                                {notasTipo.length === 0 ? (
                                    <p className="text-sm">No hay notas de {tipoLabel[tipo as INota["tipo"]]}</p>
                                ) : (
                                    notasTipo.slice(0, 3).map((nota) =>
                                        nota.foto ? (
                                            <div className="avatar" key={nota.nombre}>
                                                <div className="w-14 rounded-full">
                                                    <img src={nota.foto} alt={nota.nombre} />
                                                </div>
                                            </div>
                                        ) : null,
                                    ))
                                }
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {notasTipo.map((nota) => (
                                    <div key={nota.nombre} className="badge badge-s badge-soft badge-neutral">
                                        {nota.nombre}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
