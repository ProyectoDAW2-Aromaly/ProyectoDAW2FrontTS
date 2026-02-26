import { useState } from "react";
import Navbar from "../../components/Navbar";
import { usePerfumeViewModel } from "./usePerfumeViewModel";

const seasons = [
    { name: "Otoño", icon: "/perfume-info/icons/season/autumn-icon.svg" },
    { name: "Invierno", icon: "/perfume-info/icons/season/winter-icon.svg" },
    { name: "Primavera", icon: "/perfume-info/icons/season/spring-icon.svg" },
    { name: "Verano", icon: "/perfume-info/icons/season/summer-icon.svg" },
];

const PerfumePage = () => {
    const { selectedPerfume } = usePerfumeViewModel()

    const [valueDuration, setValueDuration] = useState(0);
    const [valuePrice, setValuePrice] = useState(0);

    if (selectedPerfume === undefined) return null

    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                <div className="card card-side bg-base-100 shadow-sm">
                    <figure className="w-4xl h-auto">
                        <img
                            src={selectedPerfume.image.src}
                            alt={selectedPerfume.image.alt}
                        />
                    </figure>
                    <div className="card-body items-start">
                        <h1 className="card-title ml-2">{selectedPerfume.name}</h1>
                        <button className="btn btn-ghost bg-[#FFF7ED] rounded-2xl self-start p-2 h-auto min-h-0"> {/*Habría que mirar qué hacer cuando es el tema oscuro*/}
                            <figure className="w-auto h-5">
                                <img
                                    src={selectedPerfume.logo.src}
                                    alt={selectedPerfume.logo.alt}
                                />
                            </figure>
                        </button>
                        <div className="divider">Descripción</div>
                        <p>{selectedPerfume.description.map(description =>
                            <span key={description}>
                                {description}
                                <br />
                                <br />
                            </span>
                        )}
                        </p>
                        <div className="divider">Información general</div>
                        <h5>Familia olfativa:
                            {selectedPerfume.families.map(family =>
                                <a href="" className="badge badge-xs badge-soft badge-neutral ml-2">{family}</a>
                            )}
                        </h5>
                        <h5 className="flex items-center">
                            Género
                            <figure >
                                <img
                                    src={selectedPerfume.genderIcon}
                                    alt="Icono de género"
                                    className="w-5 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5> {/* https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis */}
                        
                        <h5>
                            Perfumista:
                            {selectedPerfume.perfumer.map((perfumer) => (
                                <span key={perfumer.id}>
                                    <a className="badge badge-xs badge-soft badge-neutral ml-2" href={`/perfumer/?id=${perfumer.id}`}>
                                        {perfumer.name}
                                    </a>
                                </span>
                            ))}
                        </h5>
                        <h5>Fecha de lanzamiento: {selectedPerfume.releaseDate}</h5>
                    </div>
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">PIRÁMIDE OLFATIVA</h1>
                <div className="flex flex-wrap gap-12" >
                    {selectedPerfume.pyramids.map(pyramid =>
                        <div className="card bg-base-100 shadow-sm w-96" key={pyramid.category}>
                            <div className="card-body">
                                <h2 className="card-title">{pyramid.category}</h2>

                                <div className="flex flex-wrap gap-6 mb-4">
                                    {pyramid.notes.map(note =>
                                        note.imageSrc ?
                                            <div className="avatar" key={note.name}>
                                                <div className="w-14 rounded-full">
                                                    <img src={note.imageSrc} />
                                                </div>
                                            </div>
                                            : null
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {pyramid.notes.map(note =>
                                        <a key={note.name} href="" className="badge badge-s badge-soft badge-neutral">{note.name}</a>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    <div className="flex">
                        <div className="card-body w-1/2">
                            <h2 className="card-title">Tu valoración</h2>
                            <div className="flex w-40 mt-5 mb-2">
                                <img
                                    src="/perfume-info/icons/rating/calendar-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-5 icon-theme-aware mr-2"
                                />
                                <p>Época del año</p>
                            </div>

                            <div className="flex gap-4 mb-2">
                                {/* peer: Afecta al elemento hermano, es para poner efectos*/}
                                {seasons.map((season) => {
                                    const iconClases = `
                                        w-5 filter grayscale
                                        peer-checked:grayscale-0 peer-checked:grayscale peer-checked:scale-110
                                        hover:-translate-y-1 hover:scale-110 
                                        transition-all duration-200 ease-in-out 
                                    `;

                                    return(
                                        <label key={season.name} className="flex w-40 cursor-pointer gap-2">
                                            <input type="checkbox" className="peer hidden" />
                                            <img src={season.icon} alt={`Icono de ${season.name}`} className={iconClases} />
                                            <span>{season.name}</span>
                                        </label>
                                    )
                                })}

                            </div>
                            
                            <div className="flex w-40 mt-5">
                                <img
                                    src="/perfume-info/icons/rating/time-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-5 icon-theme-aware mr-2"
                                />
                                <p>Duración</p>
                            </div>

                            <div className="w-full relative">
                                <input
                                    type="range"
                                    min={0}
                                    max={3}
                                    step={1}
                                    value={valueDuration}
                                    onChange={(e) => setValueDuration(Number(e.target.value))}
                                    className="range range-xs w-full [--range-fill:0]"
                                />

                                {/* <div className="flex justify-between px-2.5 text-xs">
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                </div> */}

                                <div className="relative w-full h-4 mt-2">
                                    <span className="absolute left-0 text-xs">Escasa (0-2h)</span>
                                    <span className="absolute left-[33.333%] transform -translate-x-1/2 text-xs">Poca (3-6h)</span>
                                    <span className="absolute left-[66.666%] transform -translate-x-1/2 text-xs">Buena (5-12h)</span>
                                    <span className="absolute right-0 text-xs">Excelente (+12h)</span>
                                </div>
                            </div>

                                    
                            <div className="flex w-40 mt-5">
                                <img
                                    src="/perfume-info/icons/rating/coin-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-5 icon-theme-aware mr-2"
                                />
                                <p>Precio</p>
                            </div>

                            <div className="w-full relative">
                                <input
                                    type="range"
                                    min={0}
                                    max={3}
                                    step={1}
                                    value={valuePrice}
                                    onChange={(e) => setValuePrice(Number(e.target.value))}
                                    className="range range-xs w-full [--range-fill:0]"
                                />

                                <div className="relative w-full h-4 mt-2">
                                    <span className="absolute left-0 text-xs">Económico</span>
                                    <span className="absolute left-[33.333%] transform -translate-x-1/2 text-xs">Moderado</span>
                                    <span className="absolute left-[66.666%] transform -translate-x-1/2 text-xs">Caro</span>
                                    <span className="absolute right-0 text-xs">Muy caro</span>
                                </div>
                            </div>


                            <div className="card-actions justify-end mt-2">
                                <p>aaaaaaa</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal mt-5 mb-5"></div>
                        <div className="card-body w-1/2">
                            <h2 className="card-title">Valoración media</h2>
                            <div className="flex w-40">
                                <img
                                    src="/perfume-info/icons/rating/calendar-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-4 icon-theme-aware mr-2"
                                />
                                <p>Época del año</p>
                            </div>
                            <div className="card-actions justify-end">
                                <p>aaaaaaa</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PerfumePage;