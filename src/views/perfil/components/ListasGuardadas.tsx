import { ListaCard } from "../../../components/ListaCard";
import { IListas } from "../../../interfaces/IListas";
import { IPerfil } from "../../../interfaces/IPerfil";

interface Props {
    listas: IPerfil["listasGuardadas"];
    buildSavedListCard: (lista: IPerfil["listasGuardadas"][number]) => IListas;
}

export default function ListasGuardadas({ listas, buildSavedListCard }: Props) {
    return (
        <div className="card bg-base-100 shadow-sm mt-8">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <h2 className="card-title">Listas guardadas</h2>
                    <span className="text-sm opacity-70">{listas?.length || 0} listas</span>
                </div>

                {(!listas || listas.length === 0) ? (
                    <p className="opacity-70">Todavia no has guardado ninguna lista.</p>
                ) : (
                    <div className="flex flex-wrap gap-12">
                        {listas.map((lista) => (
                            <ListaCard
                                key={`saved-${lista.id}-${lista.listaId}`}
                                data={buildSavedListCard(lista)}
                                isOwner={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}