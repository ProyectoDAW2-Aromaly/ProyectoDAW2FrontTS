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


{/* TODO: https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis TODO: Iconos de DaisyUI -> https://heroicons.com/ */ }

const PerfumePage = () => {
    const { selectedPerfume } = usePerfumeViewModel()

    const [valueDuration, setValueDuration] = useState(0);
    const [valuePrice, setValuePrice] = useState(0);

    if (selectedPerfume === undefined) return null

    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                {/* INFORMACIÓN GENERAL DEL PERFUME */}
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

                        {/* z-50 -> Profundidad. Cuanto + número, + arriba */}
                        {/* TODO: PARA TODOS LOS USUARIOS */}
                        <div className="tooltip save absolute top-2 right-2 z-50" data-tip="Guardar en favoritos">
                            <button className="btn btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-[1.6em]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>

                        {/* TODO: SOLO SI ES PREMIUM */}
                        <div className="tooltip save absolute top-2 right-14 z-50" data-tip="Guardar en lista">
                            <button className="btn btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="size-[1.6em]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>

                        {/* TODO: SOLO SI ES ADMIN */}
                        <div className="tooltip save absolute top-2 right-26 z-50" data-tip="Editar perfume">
                            <button className="btn btn-circle">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>

                            </button>
                        </div>

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
                                <div className="badge badge-sm badge-soft badge-neutral ml-2">{family}</div>
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
                                    <a className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent" href={`/perfumer/?id=${perfumer.id}`}>
                                        {perfumer.name}
                                    </a>
                                </span>
                            ))}
                        </h5>
                        <h5>Fecha de lanzamiento: {selectedPerfume.releaseDate}</h5>
                        <h5>Colección: <a href="" className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent">{selectedPerfume.colection}</a></h5>
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
                                        <a key={note.name} href="" className="badge badge-s badge-soft badge-neutral hover:badge-accent">{note.name}</a>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* VALORACIONES */}
                {/* FIXME: Faltan quitar votación en la estrella */}
                {/* TODO: Igual en vez de un range, mejor un radio, range es raro */}
                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    <div className="flex">
                        <div className="card-body w-1/2">
                            <h2 className="card-title">Tu valoración</h2>
                            {/* ÉPOCA */}
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

                            {/* DURACIÓN*/}
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

                            {/* PRECIO */}
                            <div className="h-25">
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/coin-icon.svg"
                                        alt="Logo precio moneda de dólar"
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

                            {/* FIXME: PUNTUACIÓN GENERAL */}
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
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <input
                                                key={i}
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 hover:scale-125 transition-transform duration-200"
                                                aria-label={`${i} star`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider divider-horizontal mt-5 mb-5"></div>
                        {/* VALORACIÓN MEDIA/RESULTADOS */}
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
                <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
                <div className="flex flex-wrap gap-12" >

                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body flex flex-col justify-between">

                            <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista">
                                <button className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="card-title">Axel</h2>
                                </div>
                            </div>

                            <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />

                            <div className="divider h-1 my-0"></div>
                            <h2 className="font-semibold">PERFUMES NICHO</h2>
                            <div className="divider h-1 my-0"></div>

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
                            <button className="btn hover:btn-neutral hover:text-primary-content">Ver lista completa</button>

                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body flex flex-col justify-between">

                            <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista" >
                                <button className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile2.jpg" alt="Perfil" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="card-title">Jakob</h2>
                                </div>
                            </div>


                            <div className="divider h-1 my-0"></div>
                            <h2 className="font-semibold">HAGO UN TÍTULO LARGO PARA VER COMO QUEDA ASÍ</h2>
                            <div className="divider h-1 my-0"></div>

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
                            <button className="btn hover:btn-neutral hover:text-primary-content">Ver lista completa</button>

                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-sm w-96">
                        <div className="card-body flex flex-col justify-between">
                            <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista" >
                                <button className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile3.png" alt="Perfil" />
                                    </div>
                                </div>

                                {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/coffee-cup.svg" alt="Icono buy me a coffee" className="absolute top-0 left-4 w-9 h-9 -rotate-22" />

                                <div className="flex flex-col">
                                    <h2 className="card-title">Kevin</h2>
                                </div>
                            </div>


                            <div className="divider h-1 my-0"></div>
                            <h2 className="font-semibold">PERFUMES VERANO</h2>
                            <div className="divider h-1 my-0"></div>

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
                                        <img src="/perfume-info/perfume/ELDO/eldo-perfume.webp" />
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
                            <button className="btn hover:btn-neutral hover:text-primary-content">Ver lista completa</button>

                        </div>
                    </div>

                </div>

                {/* PERFUMES SIMILARES */}
                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
                <div className="flex flex-wrap gap-12" >

                    <div className="card bg-base-100 w-96 shadow-sm rounded-2xl relative group">

                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                            className="w-full h-80 object-cover"
                            src="/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg"
                            alt="Perfume recomendado Born in Roma Intense Donna"
                        />
                        </div>

                        <div className="absolute bottom-0 w-full rounded-b-2xl h-28 bg-black/70 transition-all duration-300 group-hover:h-3/4">

                            <div className="flex flex-col justify-center items-center p-4 text-white">
                                <h2 className="text-lg font-bold">BORN IN ROMA INTENSE DONNA</h2>
                                <a href="" className="link no-underline hover:font-bold">Valentino</a>
                            </div>

                            <div className="absolute bottom-[1/3] w-full h-1/2 flex flex-col justify-between items-center text-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <div className="badge badge-soft">Oriental</div>
                                    <div className="badge badge-soft">Floral</div>
                                    <div className="badge badge-soft">Gourmand</div>
                                </div>
                                <button className="btn btn-primary mt-2 hover:btn-neutral hover:text-primary-content">Ver perfume</button>
                            </div>

                        </div>
                    </div>

                    <div className="card bg-base-100 w-96 shadow-sm rounded-2xl overflow-hidden group">
                        <img
                            className="w-full h-80 object-cover"
                            src="/perfume-info/perfume/lira/xerjoff-lira.jpg"
                            alt="Perfume recomendado lira"
                        />

                        <div className="absolute bottom-0 w-full h-28 bg-black/70 transition-all duration-300 group-hover:h-3/4">

                            <div className="flex flex-col justify-center items-center p-4 text-white">
                                <h2 className="text-lg font-bold">LIRA</h2>
                                <a href="" className="link no-underline hover:font-bold">Xerjoff</a>
                            </div>

                            <div className="absolute bottom-[1/3] w-full h-1/2 flex flex-col justify-between items-center text-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <div className="badge badge-soft">Oriental</div>
                                    <div className="badge badge-soft">Floral</div>
                                    <div className="badge badge-soft">Gourmand</div>
                                </div>
                                <button className="btn btn-primary mt-2 hover:btn-neutral hover:text-primary-content">Ver perfume</button>
                            </div>

                        </div>
                    </div>

                    <div className="card bg-base-100 w-96 shadow-sm rounded-2xl overflow-hidden group">
                        <img
                            className="w-full h-80 object-cover"
                            src="/perfume-info/perfume/ELDO/eldo-perfume.webp"
                            alt="Perfume recomendado eldo"
                        />

                        <div className="absolute bottom-0 w-full h-28 bg-black/70 transition-all duration-300 group-hover:h-3/4">

                            <div className="flex flex-col justify-center items-center p-4 text-white">
                                <h2 className="text-lg font-bold">ATTAQUER LE SOLEIL - MARQUIS DE SADE</h2>
                                <a href="" className="link no-underline hover:font-bold">Etat Libre D'Orange</a>
                            </div>

                            <div className="absolute bottom-[1/3] w-full h-1/2 flex flex-col justify-between items-center text-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <div className="badge badge-soft">Oriental</div>
                                    <div className="badge badge-soft">Floral</div>
                                    <div className="badge badge-soft">Gourmand</div>
                                </div>
                                <button className="btn btn-primary mt-2 hover:btn-neutral hover:text-primary-content">Ver perfume</button>
                            </div>

                        </div>
                    </div>

                </div>

                {/* COMENTARIOS */}
                <h1 className="text-2xl text-center mb-10 mt-10">COMENTARIOS</h1>
                <div className="flex flex-col gap-2" >

                    {/* COMENTARIO 1 */}
                    <div className="card bg-base-100 shadow-sm w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                </div>

                                {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />

                                <div>
                                    <h2 className="card-title">Axel</h2>
                                    <p>Comentario random de este perfume. No sé si debería poner las estrellas que este usuario ha puesto o dejarlo sin estrellas, ya que el usuario puede haber votado o no, y simplemente haber comentado sin haber votado</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* COMENTARIO 2 */}
                    <div className="card bg-base-100 shadow-sm w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                </div>

                                {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22" />

                                <div>
                                    <h2 className="card-title">Axel</h2>
                                    <p>Comentario random de este perfume. No sé si debería poner las estrellas que este usuario ha puesto o dejarlo sin estrellas, ya que el usuario puede haber votado o no, y simplemente haber comentado sin haber votado</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* FIXME: Arreglar poner "Si hay usuario X, si no lo hay Y" */}
                <div className="divider">Añade un comentario</div>
                <div className="flex flex-col">
                    <div className="card bg-base-100 shadow-sm w-full">
                        {/* TODO: SI HAY USUARIO */}
                        <div className="card-body">

                            <div className="flex gap-6 mb-2 items-start w-full">
                                <div className="flex flex-col items-center">
                                    <div className="avatar w-14 shrink-0">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile2.jpg" alt="Foto de perfil de Jakob" />
                                    </div>
                                </div>
                                <p className="mt-2 font-semibold">Jakob</p>
                                </div>
                                

                                <div className="w-full">
                                    <div className="flex flex-col gap-2 w-full">

                                        <textarea
                                            className="textarea textarea-md w-full h-22"
                                            placeholder="Escribe aquí tu comentario..."
                                        ></textarea>

                                        <button className="btn self-end">Comentar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* TODO: SI NO HAY USUARIO */}
                        {/* <div className="card-body">
                            <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                <p className="text-center">Debes <a className="link hover:link-accent hover:no-underline hover:font-semibold" href="">Registrarte</a> o <a className="link hover:link-accent hover:no-underline hover:font-semibold" href="">Iniciar sesión</a> para dejar un comentario</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>


            {/* Cuando exista */}
            {/* <Footer /> */}
        </div>
    )
}

export default PerfumePage;