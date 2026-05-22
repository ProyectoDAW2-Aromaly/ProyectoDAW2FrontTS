import { useEffect, useState } from "react";
import { ListaCard } from "../../../components/ListaCard";
import { PerfumeCard } from "../../../components/PerfumeCard";
import { IPerfumeBackend } from "../../../interfaces/IPerfume";
import { getAllPerfumes } from "../../../services/perfume.services";
import { IListas } from "../../../interfaces/IListas";
import { getPublicLists } from "../../../services/listas.services";

export const SeccionRecomendados = () => {
    const [perfumesRecomendados, setPerfumesRecomendados] = useState<IPerfumeBackend[]>([]);
    const [listasRecomendadas, setListasRecomendadas] = useState<IListas[]>([]);

    useEffect(() => {
        getAllPerfumes().then((res) => setPerfumesRecomendados(res.slice(1, 4)))
        getPublicLists().then((res) => setListasRecomendadas(res.slice(1, 4)))
    }, [])

    return <>
        <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
        <div className="flex flex-wrap gap-12">
            {listasRecomendadas.slice(0, 3).map((lista) => (
                <ListaCard data={lista} key={lista.id} />
            ))}
        </div>

        <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
        <div className="flex flex-wrap gap-12">
            {perfumesRecomendados.map((perfume) => (
                <PerfumeCard data={perfume} key={perfume.id} />
            ))}
        </div>
    </>
};
