import { useState } from "react";
import Navbar from "../../components/Navbar";
import { usePerfumeViewModel } from "./usePerfumeViewModel";

const seasons = [
    { name: "Otoño", icon: "/perfume-info/icons/season/autumn-icon.svg" },
    { name: "Invierno", icon: "/perfume-info/icons/season/winter-icon.svg" },
    { name: "Primavera", icon: "/perfume-info/icons/season/spring-icon.svg" },
    { name: "Verano", icon: "/perfume-info/icons/season/summer-icon.svg" },
];

const labelsDuration = ["Escasa (0-2h)", "Poca (3-6h)", "Buena (5-12h)", "Excelente (+12h)"];
const labelsPrice = ["Económico", "Moderado", "Caro", "Muy caro"];

{/* TODO: https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis */}

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
                    <figure className="w-4xl h-auto flex-3">
                        <img
                            src={selectedPerfume.image.src}
                            alt={selectedPerfume.image.alt}
                        />
                    </figure>
                    <div className="card-body items-start flex-5">
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
                        </h5>
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

                {/* PIRÁMIDE OLFATIVA */}

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

                {/* VALORACIONES */}

                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    <div className="flex">
                        <div className="card-body w-1/2">
                            <h2 className="card-title">Tu valoración</h2>
                            {/* div de época del año votación*/}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/calendar-icon.svg"
                                        alt="Logo época del año calendario"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Época del año</p>
                                </div>

                                <div className="flex gap-4 mb-2 mt-5">
                                    {/* peer: Afecta al elemento hermano, es para poner efectos*/}
                                    {seasons.map((season) => {
                                        const iconClases = `
                                        w-5 filter grayscale
                                        peer-checked:grayscale-0 peer-checked:grayscale peer-checked:scale-110
                                        hover:-translate-y-1 hover:scale-110 
                                        transition-all duration-200 ease-in-out 
                                    `;

                                        return (
                                            <label key={season.name} className="flex w-40 cursor-pointer gap-2">
                                                <input type="checkbox" className="peer hidden" />
                                                <img src={season.icon} alt={`Icono de ${season.name}`} className={iconClases} />
                                                <span>{season.name}</span>
                                            </label>
                                        )
                                    })}

                                </div>

                            </div>
                            
                            {/* div de duración votación*/}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/time-icon.svg"
                                        alt="Logo duración reloj de arena"
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

                                    {/* <div className="relative w-full h-4 mt-2">
                                    <span className="absolute left-0 text-xs">Escasa (0-2h)</span>
                                    <span className="absolute left-[33.333%] transform -translate-x-1/2 text-xs">Poca (3-6h)</span>
                                    <span className="absolute left-[66.666%] transform -translate-x-1/2 text-xs">Buena (5-12h)</span>
                                    <span className="absolute right-0 text-xs">Excelente (+12h)</span>
                                </div> */}
                                    <div className="relative w-full mt-3 flex justify-between">
                                        {labelsDuration.map((label, index) => (
                                            <span
                                                key={label}
                                                className={`text-xs transition-all duration-200 ${valueDuration === index
                                                    ? "font-bold text-primary scale-110"
                                                    : "text-base-content/60"
                                                    }`}
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* div de precio votación*/}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/coin-icon.svg"
                                        alt="Logo precio moneda de dólar"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Precio</p>
                                </div>

                                {/* <div className="w-full relative">
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
                            </div> */}


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

                                    <div className="relative w-full mt-3 flex justify-between">
                                        {labelsPrice.map((label, index) => (
                                            <span
                                                key={label}
                                                className={`text-xs transition-all duration-200 ${valuePrice === index
                                                    ? "font-bold text-primary scale-110"
                                                    : "text-base-content/60"
                                                    }`}
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* div de puntuación general votación*/}
                            {/* TODO: Había que poner animación cuando pasas el ratón por encima */}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/star-icon.svg"
                                        alt="Logo puntuación general estrella"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Puntuación general</p>
                                </div>

                                <div className="w-full relative">
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider divider-horizontal mt-5 mb-5"></div>
                        <div className="card-body w-1/2">
                            <h2 className="card-title">Valoración media</h2>

                            {/* Época del año resultado */}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/calendar-icon.svg"
                                        alt="Logo época del año calendario"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Época del año</p>
                                </div>

                                <div className="flex gap-6">
                                    {seasons.map((season) => {
                                        const value = 70;
                                        return (
                                            <div className="flex flex-col items-center">
                                                <div className="radial-progress flex"
                                                    style={{ "--value": value, "--size": "2.5rem" } as React.CSSProperties}
                                                    aria-valuenow={70} role="progressbar">
                                                    <img src={season.icon} alt={`Icono de ${season.name}`} className="w-5" />
                                                </div>
                                                <span className="text-xs font-medium">{value}%</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            {/* Duración resultado */}
                            <div className="h25">
                                <div className="flex w-40 mt-5 mb-4">
                                    <img
                                        src="/perfume-info/icons/rating/time-icon.svg"
                                        alt="Logo duración reloj de arena"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Duración</p>
                                </div>
                                <div className="badge badge-s badge-soft badge-neutral">Buena</div>
                            </div>
                            
                            {/* Precio */}
                            <div className="h25">
                                <div className="flex w-40 mt-8 mb-4">
                                    <img
                                        src="/perfume-info/icons/rating/coin-icon.svg"
                                        alt="Logo precio moneda de dólar"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Precio</p>
                                </div>
                                <div className="badge badge-s badge-soft badge-neutral">Muy caro</div>
                            </div>

                            {/* Puntuación general */}
                            <div className="h25">
                                <div className="flex w-40 mt-8 mb-4">
                                    <img
                                        src="/perfume-info/icons/rating/star-icon.svg"
                                        alt="Logo puntuación general estrella"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Puntuación general</p>
                                </div>

                                <div className="w-full relative">
                                    <div className="rating">
                                        <div className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                        <div className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                        <div className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                        <div className="mask mask-star-2 bg-orange-400" aria-label="4 star" aria-current="true" />
                                        <div className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                {/* LISTAS DESTACADAS */}

                {/* Necesitamos nombre de usuario + icono, seguir la lista, título de la lista, iconos con los perfumes, y ¿época del año o mejor quitarla? y ver lista completa */}

                <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
                <div className="flex flex-wrap gap-12" >

                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body">

                            {/* <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista">
                                <button className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div> */}

                            <div className="flex flex-wrap gap-6 mb-4 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Perfil" />
                                    </div>
                                </div>

                                {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/crown-1.svg" alt="Icono premium cororna" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22"/>

                                <div className="flex flex-col">
                                    <h2 className="card-title">Axel Ähman</h2>
                                    <a href="" className="badge badge-s badge-soft badge-neutral mt-2">Guardar lista</a>
                                </div>
                            </div>


                            <div className="divider m-0"></div>
                            <h2>PERFUMES NICHO</h2>
                            <div className="divider m-0"></div>

                            <div className="avatar-group flex justify-center -space-x-2">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-12">
                                        <span>+5</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn">Ver lista completa</button>

                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body">

                            <div className="flex flex-wrap gap-6 mb-4 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile2.jpg" alt="Perfil" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="card-title mb-2">Jakob</h2>
                                    <button className="btn btn-xs">Guardar lista</button>
                                </div>
                            </div>

                            <div className="divider divider-neutral m-0"></div>
                            <h2>Mis favoritos unisex</h2>
                            <div className="divider divider-neutral m-0"></div>

                            <div className="avatar-group flex justify-center -space-x-2">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-12">
                                        <span>+20</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn">Ver lista completa</button>


                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body">
                            <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista">
                                <button className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* <button className="btn absolute top-2 right-2">
                                Guardar
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            </button> */}

                            <div className="flex flex-wrap gap-6 mb-4 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile3.png" alt="Perfil" />
                                    </div>
                                </div>

                                <div className="flex">
                                    <h2 className="card-title mb-2">Kevin</h2>
                                </div>
                            </div>

                            <div className="divider font-semibold mt-0">CALIDAD PRECIO</div>

                            <div className="avatar-group flex justify-center -space-x-2">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                                    </div>
                                </div>
                                {/* <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-12">
                                        <span>+10</span>
                                    </div>
                                </div> */}
                            </div>
                            <button className="btn">Ver lista completa</button>

                        </div>
                    </div>

                </div>

                {/* PERFUMES SIMILARES */}

                {/* Card con imagen del perfume, logo + nombre, género, notas base y ¿época del año? + botón de ver perfume */}

                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
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

                {/* COMENTARIOS */}

                {/* Necesito iconos varios + foto de perfil + nombre + descripción del perfume + ranking estrellas si lo hay + botón de responder */}

                {/* FIXME: Esto fue una prueba, como idea, obviamente no está terminado */}

                <h1 className="text-2xl text-center mb-10 mt-10">COMENTARIOS</h1>
                <div className="card bg-base-100 shadow-sm w-auto" >
                    <li className="flex list-row list-none">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Dio Lupa</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                        </div>
                        <p className="list-col-wrap text-xs">
                            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                        </p>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                        </button>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        </button>
                    </li>
                </div>

            </div>
            {/* Cuando exista */}
            {/* <Footer /> */}
        </div>
    )
}

export default PerfumePage;