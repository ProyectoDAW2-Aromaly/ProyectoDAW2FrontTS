import Navbar from "../../components/Navbar";
import { usePerfumeViewModel } from "./usePerfumeViewModel";

const PerfumePage = () => {
    const { selectedPerfume } = usePerfumeViewModel()

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
                        <h5>Perfumista: <a href={`/perfumer/?id=${selectedPerfume.perfumer.id}`}>{selectedPerfume.perfumer.name}</a></h5>
                        <h5>Fecha de lanzamiento: {selectedPerfume.releaseDate}</h5>

                        {/* <p>Sus notas base son: Naranja roja, lavanda, bergamota (top). Canela, jazmin, rosa (corazón). Caramelo, almizcle, vainilla (base)</p> */}
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
                            <div className="flex w-40">
                                <img
                                    src="/perfume-info/icons/rating/calendar-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-4 icon-theme-aware mr-2"
                                />
                                <p>Época del año</p>
                            </div>

                            <div className="flex gap-4">

                                <label className="flex w-40 cursor-pointer gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm hidden" />
                                    <img className="w-5" src="/perfume-info/icons/season/autumn-icon.svg" alt="Icono de otoño" />
                                    <span>Otoño</span>
                                </label>

                                <label className="flex w-40 cursor-pointer gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm hidden" />
                                    <img className="w-5" src="/perfume-info/icons/season/winter-icon.svg" alt="Icono de invierno" />
                                    <span>Invierno</span>
                                </label>

                                <label className="flex w-40 cursor-pointer gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm hidden" />
                                    <img className="w-5" src="/perfume-info/icons/season/spring-icon.svg" alt="Icono de primavera" />
                                    <span>Primavera</span>
                                </label>

                                <label className="flex w-40 cursor-pointer gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm hidden" />
                                    <img className="w-5" src="/perfume-info/icons/season/summer-icon.svg" alt="Icono de verano" />
                                    <span>Verano</span>
                                </label>

                            </div>

                            <div className="flex w-40">
                                <img
                                    src="/perfume-info/icons/rating/time-icon.svg"
                                    alt="Logo época del año calendario"
                                    className="w-4 icon-theme-aware mr-2"
                                />
                                <p>Duración</p>
                            </div>

                            <div className="w-full max-w-xs">
                                <input type="range" min={0} max="100" value="25" className="range" step="25" />
                                <div className="flex justify-between px-2.5 mt-2 text-xs">
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                </div>
                                <div className="flex justify-between px-2.5 mt-2 text-xs">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>


                            <div className="card-actions justify-end">
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