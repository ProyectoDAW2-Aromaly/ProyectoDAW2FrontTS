import { useEffect, useState } from "react";
import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { ListCard } from "../../components/ListCard";
import { CardPerfume, type ICardPerfume } from "../../components/CardPerfume";
import type { IUser } from "../../servicios/usuarios.services";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { LIST } from "../list/ListData";
import {
    addPerfumeToList,
    getMyListsForPerfume,
    removePerfumeFromList,
    type IListaPerfumeOption,
} from "../../servicios/listas.services";

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
];

interface IPerfumePage {
    user?: IUser;
}

const PerfumePage = ({ user }: IPerfumePage) => {
    const navigate = useNavigate();
    const [listasUsuario, setListasUsuario] = useState<IListaPerfumeOption[]>([]);
    const [listasLoading, setListasLoading] = useState(false);
    const [listasError, setListasError] = useState("");

    const goToEditPerfume = (perfumeId: string) => {
        navigate(`/perfume/form?edit=${perfumeId}`);
    };

    const {
        selectedPerfume,
        rating,
        handleRatingChange,
        liked,
        setLiked
    } = usePerfumeViewModel();

    useEffect(() => {
        const loadListas = async () => {
            if (!user || !selectedPerfume?.id) {
                setListasUsuario([]);
                return;
            }

            try {
                setListasLoading(true);
                setListasError("");
                const listas = await getMyListsForPerfume(Number(selectedPerfume.id));
                setListasUsuario(listas);
            } catch (err) {
                setListasError(err instanceof Error ? err.message : "No se pudieron cargar las listas");
            } finally {
                setListasLoading(false);
            }
        };

        loadListas();
    }, [user, selectedPerfume?.id]);

    const handleTogglePerfumeInList = async (idLista: number, checked: boolean) => {
        if (!selectedPerfume?.id) return;

        const idPerfume = Number(selectedPerfume.id);

        try {
            setListasError("");

            if (checked) {
                await addPerfumeToList(idLista, idPerfume);
            } else {
                await removePerfumeFromList(idLista, idPerfume);
            }

            setListasUsuario((prev) =>
                prev.map((lista) =>
                    lista.id === idLista
                        ? {
                            ...lista,
                            contienePerfume: checked,
                            totalPerfumes: checked
                                ? lista.totalPerfumes + 1
                                : Math.max(0, lista.totalPerfumes - 1),
                        }
                        : lista
                )
            );
        } catch (err) {
            setListasError(err instanceof Error ? err.message : "No se pudo actualizar la lista");
        }
    };

    if (selectedPerfume === undefined) return null;

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 mt-25">
                <div className="card card-side bg-base-100 shadow-sm flex flex-col md:flex-row">
                    <figure className="w-full md:w-4xl h-auto flex-3">
                        <img
                            src={selectedPerfume.image.src}
                            alt={selectedPerfume.image.alt}
                        />
                    </figure>
                    <div className="card-body items-start flex-5">
                        <h1 className="card-title ml-2">{selectedPerfume.name}</h1>
                        <Link to="/brand?name=xerjoff" className="btn btn-ghost bg-[#FFF7ED] self-start p-2 h-auto min-h-0">
                            <figure className="flex items-center justify-center rounded-none">
                                <img
                                    src={selectedPerfume.logo.src}
                                    alt={selectedPerfume.logo.alt}
                                    style={{
                                        width: "80px",
                                        height: "auto",
                                        maxHeight: "60px"
                                    }}
                                    className="object-contain"
                                />
                            </figure>
                        </Link>

                        <div className="absolute top-2 right-2 flex gap-2 z-40">
                            {user?.rol === "ADMIN" ? (
                                <div className="tooltip save" data-tip="Editar perfume">
                                    <button className="btn btn-circle" onClick={() => goToEditPerfume(selectedPerfume.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </div>
                            ) : null}

                            {user ? (
                                <div className="dropdown dropdown-end tooltip save" data-tip="Guardar en lista">
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
                                    <div tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-10 w-64 p-3 shadow-sm mt-2">
                                        <h4 className="font-semibold mb-2">Guardar en lista</h4>

                                        {listasLoading && <p className="text-sm opacity-70">Cargando listas...</p>}
                                        {listasError && <p className="text-sm text-error mb-2">{listasError}</p>}
                                        {!listasLoading && listasUsuario.length === 0 && (
                                            <p className="text-sm opacity-70">No tienes listas creadas.</p>
                                        )}

                                        <ul className="space-y-2 max-h-52 overflow-y-auto">
                                            {listasUsuario.map((list) => (
                                                <li className="flex items-center justify-between gap-3" key={list.id}>
                                                    <div>
                                                        <p className="font-medium">{list.nombre}</p>
                                                        <p className="text-xs opacity-60">
                                                            {list.totalPerfumes} perfumes
                                                        </p>
                                                    </div>

                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-primary"
                                                        checked={list.contienePerfume}
                                                        onChange={(e) => handleTogglePerfumeInList(list.id, e.target.checked)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="divider my-2"></div>
                                        <Link to="/perfil" className="btn btn-sm btn-neutral w-full">
                                            Crear o gestionar listas
                                        </Link>
                                    </div>
                                </div>
                            ) : null}

                            {user ? (
                                <div
                                    className="tooltip save"
                                    data-tip={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                                >
                                    <button className="btn btn-circle" onClick={() => setLiked(!liked)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={liked ? "currentColor" : "none"}
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="size-[1.6em]"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </button>
                                </div>
                            ) : null}
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
                                <div key={family} className="badge badge-sm badge-soft badge-neutral ml-2">{family}</div>
                            )}
                        </h5>
                        <h5 className="flex items-center">
                            Género
                            <figure>
                                <img
                                    src={selectedPerfume.genderIcon}
                                    alt="Icono de género"
                                    className="w-5 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5>
                        <h5>Perfumista:
                            {selectedPerfume.perfumer.map((perfumer) => (
                                <span key={perfumer.id}>
                                    <Link className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent" to="/perfumer/?id=1">
                                        {perfumer.name}
                                    </Link>
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

                <h1 className="text-2xl text-center mb-10 mt-10">PIRÁMIDE OLFATIVA</h1>
                <div className="flex flex-wrap gap-12">
                    {selectedPerfume.pyramids.map(pyramid =>
                        <div className="card bg-base-100 shadow-sm w-96" key={pyramid.category}>
                            <div className="card-body">
                                <h2 className="card-title">{pyramid.category}</h2>

                                <div className="flex flex-wrap gap-6 mb-4">
                                    {pyramid.notes.map(note =>
                                        note.imageSrc ? (
                                            <div className="avatar" key={note.name}>
                                                <div className="w-14 rounded-full">
                                                    <img src={note.imageSrc} />
                                                </div>
                                            </div>
                                        ) : null
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

                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card bg-base-100 shadow-sm w-auto">
                    <div className="flex flex-col md:flex-row">
                        <div className="card-body w-full md:w-1/2">
                            <h2 className="card-title">Tu valoración</h2>
                            {user ? (
                                <>
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
                                            {seasons.map((season) => {
                                                const iconClases = "w-5 grayscale peer-checked:grayscale-0 hover:scale-115 transition-transform duration-150 ease-out";

                                                return (
                                                    <label key={season.name} className="flex w-40 cursor-pointer gap-2">
                                                        <input type="checkbox" className="peer hidden" />
                                                        <img src={season.icon} alt={`Icono de ${season.name}`} className={iconClases} />
                                                        <span className="transition-all peer-checked:text-primary">{season.name}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

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
                                                        if (rating?.duration === index) {
                                                            handleRatingChange("duration", undefined);
                                                        } else {
                                                            handleRatingChange("duration", index);
                                                        }
                                                    }} />
                                                    <span className={`text-sm transition-colors ${rating?.duration === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

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
                                                        if (rating?.price === index) {
                                                            handleRatingChange("price", undefined);
                                                        } else {
                                                            handleRatingChange("price", index);
                                                        }
                                                    }} />
                                                    <span className={`text-sm transition-all ${rating?.price === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

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
                                                            if (rating?.general === star) {
                                                                handleRatingChange("general", undefined);
                                                            } else {
                                                                handleRatingChange("general", star);
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="card-body">
                                    <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                        <h1 className="text-center text-lg">Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">registrarte</Link>
                                            &nbsp;o&nbsp;
                                            <Link className="link hover:link-accent hover:no-underline" to="/login">iniciar sesión</Link>
                                            &nbsp;para votar en un perfume.
                                        </h1>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="divider md:divider-horizontal mt-5 mb-5"></div>
                        <div className="card-body w-full md:w-1/2">
                            <h2 className="card-title">Valoración media</h2>

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
                                            <div className="flex flex-col items-center" key={season.name}>
                                                <div className="radial-progress flex"
                                                    style={{ "--value": value, "--size": "2.3rem" } as React.CSSProperties}
                                                    aria-valuenow={70} role="progressbar">
                                                    <img src={season.icon} alt={`Icono de ${season.name}`} className="w-4.5" />
                                                </div>
                                                <span className="text-xs font-medium">{value}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

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

                <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
                <div className="flex flex-wrap gap-12">
                    {LIST.slice(0, 3).map(list =>
                        <ListCard data={list} user={user} key={list.id} />
                    )}
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
                <div className="flex flex-wrap gap-12">
                    {mockedPerfumes.map(list =>
                        <CardPerfume data={list} key={list.id} />
                    )}
                </div>

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
                <div className="flex flex-col gap-2">
                    <div className="card bg-base-100 w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0 relative">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
                                    <img src="/user/icons/crown-1.svg" alt="Icono premium corona" className="absolute -top-5.5 -left-1 w-8 h-8 -rotate-22" />
                                </div>

                                <div>
                                    <h2 className="card-title">Axel</h2>
                                    <p>Comentario random de este perfume. No sé si debería poner las estrellas que este usuario ha puesto o dejarlo sin estrellas, ya que el usuario puede haber votado o no, y simplemente haber comentado sin haber votado</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-auto">
                        <div className="card-body flex flex-col justify-between">
                            <div className="flex gap-6 mb-2 items-center">
                                <div className="avatar w-14 shrink-0 relative">
                                    <div className="w-14 rounded-full">
                                        <img src="/user/profile-pic/profile1.jpg" alt="Foto de perfil de Axel" />
                                    </div>
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
        </div>
    );
};

export default PerfumePage;
