import { useEffect, useState } from "react";
import { usePerfumeViewModel } from "./usePerfumeViewModel";
import { ListCard } from "../../components/ListCard";
import { PerfumeCard, type ICardPerfume } from "../../components/PerfumeCard";
import type { IUser } from "../../servicios/usuarios.services";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { LIST } from "../lista/ListData";
import {
    addPerfumeToList,
    getMyListsForPerfume,
    removePerfumeFromList,
    type IListaPerfumeOption,
} from "../../peticiones";
import { SeccionPiramide } from "./components/SeccionPiramide";
import { SeccionValoraciones } from "./components/SeccionValoraciones";
import { SeccionComentarios } from "./components/SeccionComentarios";


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
        toggleFavorite,
        loadingFavorite
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
                            src={selectedPerfume.imagen.src}
                            alt={selectedPerfume.imagen.alt}
                        />
                    </figure>
                    <div className="card-body items-start flex-5">
                        <h1 className="card-title ml-2">{selectedPerfume.nombre}</h1>
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
                                    <button 
                                        className="btn btn-circle" 
                                        onClick={toggleFavorite}
                                        disabled={loadingFavorite}
                                    >
                                        {loadingFavorite ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
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
                                        )}
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        <div className="divider">Descripción</div>
                        <p>{selectedPerfume.descripcion}
                        </p>
                        <div className="divider">Información general</div>
                    <h5 className="flex flex-wrap items-center gap-y-1">
                            <span className="mr-1">Familia olfativa:</span>
                            {selectedPerfume.familias.map((familia: string, index: number) =>
                                <span key={`${familia}-${index}`} className="badge badge-sm badge-soft badge-neutral ml-1">{familia}</span>
                            )}
                        </h5>
                        <h5 className="flex items-center">
                            Género
                            <figure>
                                <img
                                    src={selectedPerfume.genero}
                                    alt="Icono de género"
                                    className="w-5 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5>
                        <h5 className="flex flex-wrap items-center gap-y-1">Perfumista:
                            {selectedPerfume.perfumista.map((perfumista, index) => (
                                <Link key={`perfumista-${perfumista.id}-${index}`} className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent" to={`/perfumista/${perfumista.id}`}>
                                    {perfumista.nombre}
                                </Link>
                            ))}
                        </h5>
                        <h5>Fecha de lanzamiento: {selectedPerfume.yearSalida}</h5>
                        {selectedPerfume.coleccion && (
                            <h5>
                                Colección:
                                <a href="" className="badge badge-sm badge-soft badge-neutral ml-2 hover:badge-accent">
                                    {selectedPerfume.coleccion}
                                </a>
                            </h5>
                        )}
                    </div>
                </div>

                <SeccionPiramide notas={selectedPerfume.notas} />

                <SeccionValoraciones 
                    user={user}
                    valoracion={rating || {}}
                    onNumberChange={handleRatingChange}
                    onSeasonChange={(field, value) => handleRatingChange(field, value)}
                />

                <h1 className="text-2xl text-center mb-10 mt-10">LISTAS DESTACADAS</h1>
                <div className="flex flex-wrap gap-12">
                    {LIST.slice(0, 3).map(list =>
                        <ListCard data={list} user={user} key={list.id} />
                    )}
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">PERFUMES SIMILARES</h1>
                <div className="flex flex-wrap gap-12">
                    {mockedPerfumes.map(list =>
                        <PerfumeCard data={list} key={list.id} />
                    )}
                </div>

                <SeccionComentarios user={user} />

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
