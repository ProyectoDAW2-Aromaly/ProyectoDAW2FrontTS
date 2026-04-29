import { Link } from "react-router"

export interface ICardPerfume {
    id: string,
    name: string,
    brand: string,
    image: string,
    olfactoryFamilies: string[]
}

export const PerfumeCard = ({ data } : { data: ICardPerfume}) => {
    // & tabIndex = Para que otro elemento normal pueda recibir focus, en este caso, para que funcione en móvil
    return <div className="card bg-base-100 w-96 shadow-sm rounded-2xl overflow-hidden group" tabIndex={0}>
        <img
            className="w-full h-80 object-cover"
            src={data.image}
            alt={`Perfume recomendado ${data.name}`}
        />

        {/* Hover para el pc y focus para el móvil */}
        <div className="absolute bottom-0 w-full h-28 bg-black/70 transition-all duration-300 group-hover:h-3/4 group-focus-within:h-3/4">

            <div className="flex flex-col justify-center items-center p-4 text-white">
                <h2 className="text-lg font-bold">{data.name}</h2>
                <a href="" className="link hover:font-bold hover:no-underline">{data.brand}</a>
            </div>

            <div className="absolute bottom-[1/3] w-full h-1/2 flex flex-col justify-between items-center text-center gap-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 p-6">
                <div className="flex flex-wrap justify-center gap-2">
                    {data.olfactoryFamilies.map(olfactoryFamily => 
                        <div key={olfactoryFamily} className="badge badge-soft">{olfactoryFamily}</div>
                    )}
                </div>
                <Link to={`/perfume?id=${data.id}`} className="btn btn-neutral mt-2 hover:btn-accent text-primary-content">Ver perfume</Link>
            </div>

        </div>
    </div>
}