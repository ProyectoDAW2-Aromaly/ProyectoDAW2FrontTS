import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { ListCard } from "../../components/ListCard";
import { CardPerfume, type ICardPerfume } from "../../components/CardPerfume";
import type { IUser } from "../../App";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { LIST } from "../list/ListData";

const userLists = ["Lista 1", "Lista 2", "Lista 3", "Lista 4", "Lista 5"];

const seasons = [
    { name: "Otoño", icon: "/perfume-info/icons/season/autumn-icon.svg" },
    { name: "Invierno", icon: "/perfume-info/icons/season/winter-icon.svg" },
    { name: "Primavera", icon: "/perfume-info/icons/season/spring-icon.svg" },
    { name: "Verano", icon: "/perfume-info/icons/season/summer-icon.svg" },
];

const labelsDuration = ["Escasa (0-2h)", "Poca (3-6h)", "Buena (5-12h)", "Excelente (+12h)"];
const labelsPrice = ["Económico", "Moderado", "Caro", "Muy caro"];

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
    pfp: "/user/profile-pic/profile2.jpg",
    rol: "admin"
}

{/* TODO: https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis TODO: Iconos de DaisyUI -> https://heroicons.com/ */ }

interface IPerfumePage {
    user?: IUser,
    // * Definimos que se le pasará una función que reciba un usuario. Devuelve void
    setUser: (val?: IUser) => void
}

const PerfumePage = ({ user, setUser }: IPerfumePage) => {
    const navigate = useNavigate();

    const goToEditPerfume = (perfumeId: string) => {
        navigate(`/perfume/form?edit=${perfumeId}`);
    }

    const {
        selectedPerfume,
        rating,
        handleRatingChange,
        liked,
        setLiked
    } = usePerfumeViewModel()


    if (selectedPerfume === undefined) return null

    return (
        <div>
            {/* Botones de prueba */}
            <div className="relative mt-15">
                <div className="absolute top-2 left-2 flex gap-2 z-30">
                    <button onClick={() => setUser(tempUser)} className="btn btn-xs">
                        Usuario
                    </button>
                    <button onClick={() => setUser(undefined)} className="btn btn-xs">
                        No usuario
                    </button>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 mt-25">
                {/* INFORMACIÓN GENERAL DEL PERFUME */}
                {/* FIXME: No me termina de convencer como queda el logo */}
                <div className="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row">
                    <figure className="w-full md:w-4xl h-auto flex-3">
                        <img
                            src={selectedPerfume.imagen.src}
                            alt={selectedPerfume.imagen.alt}
                        />
                    </figure>
                    <div className="card-body items-start flex-5">
                        <h1 className="card-title ml-2">{selectedPerfume.nombre}</h1>
                        {/* TODO: LINK A MARCA */}
                        <Link to="/brand?name=xerjoff" className="btn btn-ghost bg-[#FFF7ED] self-start p-2 h-auto min-h-0"> {/*Habría que mirar qué hacer cuando es el tema oscuro*/}
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
                        </Link>

                        {/* z-50 -> Profundidad. Cuanto + número, + arriba */}
                        {/* TOOLTIPS */}
                        <div className="absolute top-2 right-2 flex gap-2 z-40">

                            {/* EDITAR PERFUME -> ADMIN*/}
                            {user?.rol === "admin" ? <div className="tooltip save" data-tip="Editar perfume">
                                <button className="btn btn-circle" onClick={() => goToEditPerfume(selectedPerfume.id)}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>

                                </button>
                            </div> : null}

                            {/* GUARDAR EN LISTA X -> ADMIN + PREMIUM */}
                            {(user?.rol === "premium" || user?.rol === "admin") ? <div className="dropdown dropdown-end tooltip save" data-tip="Guardar en lista">
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

                            {/* GUARDAR EN FAVORITOS -> TODOS */}
                            {user ? <div className="tooltip save"
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

                        </div>

                        <div className="divider">Descripción</div>
                        <p>{selectedPerfume.descripcion.map(des =>
                            <span key={des}>
                                {des}
                                <br />
                                <br />
                            </span>
                        )}
                        </p>
                        <div className="divider">Información general</div>
                        <h5>Familia olfativa:
                            {selectedPerfume.familias.map(familia =>
                                <div key={familia} className="badge badge-sm badge-soft badge-neutral ml-2">{familia}</div>
                            )}
                        </h5>
                        <h5 className="flex items-center">
                            Género
                            <figure >
                                <img
                                    src={selectedPerfume.genero}
                                    alt="Icono de género"
                                    className="w-5 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5>
                        <h5>Perfumista:
                            {selectedPerfume.perfumista.map((perfumer) => (
                                <span key={perfumer.id}>
                                    <Link className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent" to={`/perfumer/?id=1`}>
                                        {perfumer.nombre}
                                    </Link>
                                </span>
                            ))}
                        </h5>
                        <h5>Fecha de lanzamiento: {selectedPerfume.yearSalida}</h5>
                        {selectedPerfume.coleccion && (
                            <h5>
                                Colección:
                                <div className="badge badge-sm badge-soft badge-neutral ml-2">
                                    {selectedPerfume.coleccion}
                                </div>
                            </h5>
                        )}

                    </div>
                </div>

                {/* PIRÁMIDE OLFATIVA */}
                <h1 className="text-2xl text-center mb-10 mt-10">PIRÁMIDE OLFATIVA</h1>
                <div className="flex flex-wrap gap-12" >
                    {selectedPerfume.piramide.map(p =>
                        <div className="card bg-base-100 shadow-sm w-96" key={p.categoria}>
                            <div className="card-body">
                                <h2 className="card-title">{p.categoria}</h2>

                                <div className="flex flex-wrap gap-6 mb-4">
                                    {p.notas.slice(0, 3).map(nota =>
                                        nota.imagenSrc ?
                                            <div className="avatar" key={nota.nombre}>
                                                <div className="w-14 rounded-full">
                                                    <img src={nota.imagenSrc} />
                                                </div>
                                            </div>
                                            : null
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {p.notas.map(note =>
                                        <div key={note.nombre} className="badge badge-s badge-soft badge-neutral">{note.nombre}</div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* VALORACIONES */}
                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    {/* md: Pantalla mediana o mayor */}
                    <div className="flex flex-col md:flex-row">
                        {/* FORMULARIO VALORACIÓN */}
                        <div className="card-body w-full md:w-1/2">
                            <h2 className="card-title">Tu valoración</h2>
                            {user ? (
                                <>
                                    {/* ÉPOCA */}
                                    <div>
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
                                                const iconClases = `w-5 grayscale peer-checked:grayscale-0 hover:scale-115 transition-transform duration-150 ease-out`;

                                                return (
                                                    <label key={season.name} className="flex w-40 cursor-pointer gap-2">
                                                        <input type="checkbox" className="peer hidden" />
                                                        <img src={season.icon} alt={`Icono de ${season.name}`} className={iconClases} />
                                                        <span className="transition-all peer-checked:text-primary">{season.name}</span>
                                                    </label>
                                                )
                                            })}

                                        </div>
                                    </div>

                                    {/* DURACIÓN*/}
                                    <div>
                                        <div className="flex w-40 mt-5 mb-2">
                                            <img
                                                src="/perfume-info/icons/rating/time-icon.svg"
                                                alt="Logo duración reloj de arena"
                                                className="w-5 icon-theme-aware mr-2"
                                            />
                                            <p>Duración</p>
                                        </div>

                                        <div className="w-full flex justify-between items-center mt-5">
                                            {labelsDuration.map((label, index) => (
                                                <label key={label} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="duration" className="radio radio-xs radio-primary" checked={rating?.duration === index} onClick={() => {
                                                        if (rating?.duration === index)
                                                            handleRatingChange("duration", undefined)
                                                        else
                                                            handleRatingChange("duration", index)
                                                    }} />
                                                    <span className={`text-sm transition-colors ${rating?.duration === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                                </label>
                                            ))}

                                        </div>
                                    </div>

                                    {/* PRECIO */}
                                    <div>
                                        <div className="flex w-40 mt-5 mb-2">
                                            <img
                                                src="/perfume-info/icons/rating/coin-icon.svg"
                                                alt="Logo precio moneda de dólar"
                                                className="w-5 icon-theme-aware mr-2"
                                            />
                                            <p>Precio</p>
                                        </div>

                                        <div className="w-full flex justify-between items-center mt-5">
                                            {labelsPrice.map((label, index) => (
                                                <label key={label} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="price" className="radio radio-xs radio-primary" checked={rating?.price === index} onClick={() => {
                                                        if (rating?.price === index)
                                                            handleRatingChange("price", undefined)
                                                        else
                                                            handleRatingChange("price", index)
                                                    }} />
                                                    <span className={`text-sm transition-all ${rating?.price === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                                </label>
                                            ))}

                                        </div>

                                    </div>

                                    {/* PUNTUACIÓN GENERAL */}
                                    <div>
                                        <div className="flex w-40 mt-5 mb-2">
                                            <img
                                                src="/perfume-info/icons/rating/star-icon.svg"
                                                alt="Logo puntuación general estrella"
                                                className="w-5 icon-theme-aware mr-2"
                                            />
                                            <p>Puntuación general</p>
                                        </div>

                                        <div className="w-full relative">
                                            <div className="rating flex gap-0.5">
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
                                </>
                            ) :
                                <div className="card-body">
                                    <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                        <h1 className="text-center text-lg">Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">registrarte</Link>
                                            &nbsp;o&nbsp;
                                            <Link className="link hover:link-accent hover:no-underline" to="/login">iniciar sesión</Link>
                                            &nbsp;para votar en un perfume.
                                        </h1>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="divider md:divider-horizontal mt-5 mb-5"></div>
                        {/* VALORACIÓN MEDIA/RESULTADOS */}
                        <div className="card-body w-full md:w-1/2">
                            <h2 className="card-title">Valoración media</h2>

                            {/* Época del año resultado */}
                            <div>
                                <div className="flex w-40 mt-5 mb-2">
                                    <img
                                        src="/perfume-info/icons/rating/calendar-icon.svg"
                                        alt="Logo época del año calendario"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Época del año</p>
                                </div>

                                <div className="flex gap-10">
                                    {seasons.map((season) => {
                                        const value = 70;
                                        return (
                                            <div className="flex flex-col items-center">
                                                <div className="radial-progress flex"
                                                    style={{ "--value": value, "--size": "2.3rem" } as React.CSSProperties}
                                                    aria-valuenow={70} role="progressbar">
                                                    <img src={season.icon} alt={`Icono de ${season.name}`} className="w-4.5" />
                                                </div>
                                                <span className="text-xs font-medium">{value}%</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Duración resultado */}
                            <div>
                                <div className="flex w-40 mt-3 mb-4">
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
                            <div>
                                <div className="flex w-40 mt-3 mb-4">
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
                            <div>
                                <div className="flex w-40 mt-3 mb-4">
                                    <img
                                        src="/perfume-info/icons/rating/star-icon.svg"
                                        alt="Logo puntuación general estrella"
                                        className="w-5 icon-theme-aware mr-2"
                                    />
                                    <p>Puntuación general</p>
                                </div>

                                <div className="w-full relative">
                                    <div className="rating flex gap-0.5">
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

                    {LIST.slice(0, 3).map(list =>
                        <ListCard data={list} user={user} key={list.id} />
                    )}

                </div>

                {/* PERFUMES SIMILARES */}
                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
                <div className="flex flex-wrap gap-12" >

                    {mockedPerfumes.map(list =>
                        <CardPerfume data={list} key={list.id} />
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

                                            <button className="btn btn-neutral hover:btn-accent text-primary-content self-end">Comentar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="card-body">
                                <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                    <h1 className="text-center text-lg">Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">registrarte</Link>
                                        &nbsp;o&nbsp;
                                        <Link className="link hover:link-accent hover:no-underline" to="/login">iniciar sesión</Link>
                                        &nbsp;para dejar un comentario.
                                    </h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="divider mt-4"></div>
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
            {/* <Footer /> */}
        </div>
    )
}

export default PerfumePage;