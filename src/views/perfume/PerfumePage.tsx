import { useState } from "react";
import Navbar from "../../components/Navbar";
import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { ListCard, type IListCard } from "../../components/ListCard";
import { CardPerfume, type ICardPerfume } from "../../components/CardPerfume";

interface IUser {
    userName: string,
    // Profile picture
    pfp: string,
    rol: string
}

const userLists = ["Lista 1", "Lista 2", "Lista 3", "Lista 4", "Lista 5"];

const seasons = [
    { name: "Otoño", icon: "/perfume-info/icons/season/autumn-icon.svg" },
    { name: "Invierno", icon: "/perfume-info/icons/season/winter-icon.svg" },
    { name: "Primavera", icon: "/perfume-info/icons/season/spring-icon.svg" },
    { name: "Verano", icon: "/perfume-info/icons/season/summer-icon.svg" },
];

const labelsDuration = ["Escasa (0-2h)", "Poca (3-6h)", "Buena (5-12h)", "Excelente (+12h)"];
const labelsPrice = ["Económico", "Moderado", "Caro", "Muy caro"];

const mockedLists: IListCard[] = [
    {
        id: "AxelID",
        username: "Axel",
        title: "Perfumes nicho",
        pfp: "/user/profile-pic/profile1.jpg",
        premium: true,
        coffee: false,
        perfumes: [
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        ]
    },
    {
        id: "JakobID",
        username: "Jakob",
        title: "TÍTULO SUPER LARGO PARA PROBAR SI ESTO ENCAJA BIEN O NO",
        pfp: "/user/profile-pic/profile2.jpg",
        premium: false,
        coffee: true,
        perfumes: [
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        ]
    },
    {
        id: "KevinID",
        username: "Kevin",
        title: "Perfumes verano",
        pfp: "/user/profile-pic/profile3.png",
        premium: false,
        coffee: false,
        perfumes: [
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        ]
    }
]

const mockedPerfumes: ICardPerfume[] = [
    {
        id: "ValentinoID",
        name: "Born in Roma Intense Donna",
        brand: "Valentino",
        image: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
    {
        id: "EldoID",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        brand: "Etat Libre D'Orange",
        image: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        olfactoryFamilies: [
            "Amaderado",
            "floral",
        ]
    },
    {
        id: "LiraId",
        name: "Lira",
        brand: "Xerjoff",
        image: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        olfactoryFamilies: [
            "Oriental",
            "floral",
            "Gourmand"
        ]
    },
]

const tempUser: IUser = {
    userName: "Jakob",
    pfp:"/user/profile-pic/profile2.jpg",
    rol: "premium"
}

{/* TODO: https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis TODO: Iconos de DaisyUI -> https://heroicons.com/ */ }

const PerfumePage = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const {
        selectedPerfume,
        rating,
        handleRatingChange
    } = usePerfumeViewModel()

    const [valueDuration, setValueDuration] = useState(0);
    const [valuePrice, setValuePrice] = useState(0);
    const [liked, setLiked] = useState(false);

    if (selectedPerfume === undefined) return null

    return (
        <div>
            <Navbar />
            <div className="relative">
                {/* Botones de prueba */}
                <div className="absolute top-2 left-2 flex gap-2 z-50">
                    <button onClick={() => setUser(tempUser)} className="btn btn-xs">
                        Usuario
                    </button>
                    <button onClick={() => setUser(null)} className="btn btn-xs">
                        No usuario
                    </button>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 mt-5">
                {/* INFORMACIÓN GENERAL DEL PERFUME */}
                {/* FIXME: No me termina de convencer como queda el logo */}
                <div className="card card-side bg-base-100 shadow-sm">
                    <figure className="w-4xl h-auto flex-3">
                        <img
                            src={selectedPerfume.image.src}
                            alt={selectedPerfume.image.alt}
                        />
                    </figure>
                    <div className="card-body items-start flex-5">
                        <h1 className="card-title ml-2">{selectedPerfume.name}</h1>
                        <button className="btn btn-ghost bg-[#FFF7ED] self-start p-2 h-auto min-h-0"> {/*Habría que mirar qué hacer cuando es el tema oscuro*/}
                            <figure className="flex items-center justify-center rounded-none">
                                <img
                                    src={selectedPerfume.logo.src}
                                    alt={selectedPerfume.logo.alt}
                                    style={{
                                        width: '80px',
                                        height: 'auto',
                                        maxHeight: '60px'
                                    }}
                                    className="object-contain"
                                />
                            </figure>
                        </button>

                        {/* z-50 -> Profundidad. Cuanto + número, + arriba */}
                        {/* TOOLTIPS */}
                        {/* Para todos los usuarios */}
                        {user? <div 
                            className="tooltip save absolute top-2 right-2 z-50"
                            data-tip={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                        >
                            <button className="btn btn-circle" onClick={() => setLiked(!liked)}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill={liked ? "currentColor" : "none"}
                                    viewBox="0 0 24 24" 
                                    strokeWidth="2" 
                                    stroke={liked ? "currentColor" : "currentColor"}
                                    className="size-[1.6em]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div> : null}

                        {/* Solo lo ve el usuario premium y el admin */}
                        {(user?.rol === "premium" || user?.rol === "admin") ? <div className="dropdown dropdown-end tooltip save absolute top-2 right-14 z-50" data-tip="Guardar en lista">
                            <label tabIndex={0} className="btn btn-circle">
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
                            </label>
                            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm mt-2 space-y-2 max-h-40 overflow-y-auto">
                            {userLists.map((list, index) => (
                                <li className="flex flex-row" key={index}>
                                    <p>{list}</p>
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                </li>
                            ))}
                            </ul>
                        </div> : null}

                        {/* Solo lo ve el admin */}
                        {user?.rol === "admin" ? <div className="tooltip save absolute top-2 right-26 z-50" data-tip="Editar perfume">
                            <button className="btn btn-circle">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>

                            </button>
                        </div> : null}

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
                        {selectedPerfume.colection && (
                            <h5>
                                Colección:
                                <a href="" className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent">
                                    {selectedPerfume.colection}
                                </a>
                            </h5>
                        )}
                        
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
                {/* TODO: Igual en vez de un range, mejor un radio, range es raro */}
                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    <div className="flex">
                        {/* FORMULARIO VALORACIÓN */}
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
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 hover:scale-125 transition-transform duration-200"
                                                aria-label={`${star} star`}
                                                checked={star === rating?.general}
                                                onClick={() => {
                                                    if (rating?.general === star)
                                                        handleRatingChange("general", undefined)
                                                    else
                                                        handleRatingChange("general", star)
                                                }}
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

                    {mockedLists.map(list => 
                        <ListCard data={list} user={user} key={list.id}/>
                    )}

                </div>

                {/* PERFUMES SIMILARES */}
                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
                <div className="flex flex-wrap gap-12" >

                    {mockedPerfumes.map(list =>
                        <CardPerfume data={list} key={list.id}/>
                    )}

                </div>
                {/* * COMENTARIOS */}
                <h1 className="text-2xl text-center mb-10 mt-10">COMENTARIOS</h1>
                <div className="divider mt-10">Añade un comentario</div>
                <div className="flex flex-col">
                    <div className="card bg-base-100 w-full">
                        {user ?
                            <div className="card-body">
                                <div className="flex gap-6 mb-2 items-start w-full">
                                    <div className="flex flex-col items-center">
                                        <div className="avatar w-14 shrink-0">
                                            <div className="w-14 rounded-full">
                                                <img src={user.pfp} alt={`Foto de perfil de ${user.userName}`} />
                                            </div>
                                        </div>
                                        <p className="mt-2 font-semibold">{user.userName}</p>
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
                            : <div className="card-body">
                                <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                    <h1 className="text-center text-lg">Debes <a className="link hover:link-accent hover:no-underline" href="">Registrarte</a>
                                        &nbsp;o&nbsp;
                                        <a className="link hover:link-accent hover:no-underline" href="">Iniciar sesión</a>
                                        &nbsp;para dejar un comentario
                                    </h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* COMENTARIOS */}
                <div className="divider mt-5"></div>
                <div className="flex flex-col gap-2" >

                    {/* COMENTARIO 1 */}
                    <div className="card bg-base-100 w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0 relative">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                    {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute -top-5.5 -left-1 w-8 h-8 -rotate-22" />
                                </div>

                                <div>
                                    <h2 className="card-title">Axel</h2>
                                    <p>Comentario random de este perfume. No sé si debería poner las estrellas que este usuario ha puesto o dejarlo sin estrellas, ya que el usuario puede haber votado o no, y simplemente haber comentado sin haber votado</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* COMENTARIO 2 */}
                    <div className="card bg-base-100 w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0 relative">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                    {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
                                <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute -top-5.5 -left-1 w-8 h-8 -rotate-22" />
                                </div>

                                <div>
                                    <h2 className="card-title">Axel</h2>
                                    <p>Comentario random de este perfume. No sé si debería poner las estrellas que este usuario ha puesto o dejarlo sin estrellas, ya que el usuario puede haber votado o no, y simplemente haber comentado sin haber votado</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Cuando exista */}
            {/* <Footer /> */}
        </div>
    )
}

export default PerfumePage;