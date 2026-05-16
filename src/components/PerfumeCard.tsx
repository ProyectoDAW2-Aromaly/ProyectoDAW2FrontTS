import { Link } from "react-router"

export interface ICardPerfume {
    id: string,
    nombre: string,
    marca: string,
    foto: string,
    familiasOlfativas: Array<string | { nombre: string }>
}

export const PerfumeCard = ({ data } : { data: ICardPerfume}) => {
    return <div className="card bg-base-100 w-96 shadow-sm rounded-2xl overflow-hidden group" tabIndex={0}>
        <img
            className="w-full h-80 object-cover"
            src={data.foto}
            alt={`Perfume ${data.nombre}`}
        />

        <div className="absolute bottom-0 w-full bg-black/70 text-white h-auto min-h-55 md:h-28 md:min-h-0 md:transition-all md:duration-300 md:group-hover:h-3/4">
            <div className="flex flex-col justify-center items-center p-4 text-white">
                <h2 className="text-lg font-bold">{data.nombre}</h2>
                {/* TODO: TIENE QUE LLEVAR A LA MARCA */}
                <a href="" className="link hover:font-bold hover:no-underline">{data.marca}</a>
            </div>

            <div className="px-6 pb-6 flex flex-col items-center gap-3 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-wrap justify-center gap-2">
                    {data.familiasOlfativas.map(fo =>
                        <div key={typeof fo === 'string' ? fo : fo.nombre} className="badge badge-soft">
                            {typeof fo === 'string' ? fo : fo.nombre}
                        </div>
                    )}
                </div>
                <Link to={`/perfume/${data.id}`} className="btn btn-neutral mt-2 hover:btn-accent text-primary-content">Ver perfume</Link>
            </div>
        </div>
    </div>
}
