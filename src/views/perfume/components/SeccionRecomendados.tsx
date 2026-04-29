import { ListCard } from "../../../components/ListCard";
import { PerfumeCard, type ICardPerfume } from "../../../components/PerfumeCard";
import type { IUser } from "../../../servicios/usuarios.services";
import { LIST } from "../../lista/ListData";

interface SeccionRecomendadosProps {
    user?: IUser;
    mockedPerfumes: ICardPerfume[];
}

export const SeccionRecomendados = ({ user, mockedPerfumes }: SeccionRecomendadosProps) => (
    <>
        <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
        <div className="flex flex-wrap gap-12">
            {LIST.slice(0, 3).map((lista) => (
                <ListCard data={lista} user={user} key={lista.id} />
            ))}
        </div>

        <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
        <div className="flex flex-wrap gap-12">
            {mockedPerfumes.map((perfume) => (
                <PerfumeCard data={perfume} key={perfume.id} />
            ))}
        </div>
    </>
);