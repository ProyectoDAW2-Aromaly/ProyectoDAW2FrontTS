import type { CSSProperties } from "react";
import { Link } from "react-router";
import type { IUser } from "../../../services/usuarios.services";
import type { IValoracion, IValoracionBooleanKey, IValoracionNumeroKey } from "../IPerfume";
import { LABELS_DURACION, LABELS_PRECIO, EPOCA } from "../utils/PerfumeConstantes";

interface RatingsSectionProps {
    user?: IUser;
    valoracion: IValoracion;
    onNumberChange: (field: IValoracionNumeroKey, value?: number) => void;
    onSeasonChange: (field: IValoracionBooleanKey, value: boolean) => void;
}

export const SeccionValoraciones = ({ user, valoracion, onNumberChange, onSeasonChange }: RatingsSectionProps) => (
    <>
        <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
        <div className="card bg-base-100 shadow-sm w-auto">
            <div className="flex flex-col md:flex-row">
                <div className="card-body w-full md:w-1/2">
                    <h2 className="card-title">Tu valoracion</h2>
                    {user ? (
                        <>
                            <div>
                                <div className="flex w-40 mt-5 mb-2">
                                    <img src="/perfume-info/icons/rating/calendar-icon.svg" alt="Logo epoca del ano calendario" className="w-5 icon-theme-aware mr-2" />
                                    <p>Epoca del ano</p>
                                </div>
                                <div className="flex gap-4 mb-2 mt-5">
                                    {EPOCA.map((estacion) => (
                                        <label key={estacion.name} className="flex w-40 cursor-pointer gap-2">
                                            <input
                                                type="checkbox"
                                                className="peer hidden"
                                                checked={Boolean(valoracion[estacion.key])}
                                                onChange={(event) => onSeasonChange(estacion.key, event.target.checked)}
                                            />
                                            <img src={estacion.icon} alt={`Icono de ${estacion.name}`} className="w-5 grayscale peer-checked:grayscale-0 hover:scale-115 transition-transform duration-150 ease-out" />
                                            <span className="transition-all peer-checked:text-primary">{estacion.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex w-40 mt-5 mb-2">
                                    <img src="/perfume-info/icons/rating/time-icon.svg" alt="Logo duracion reloj de arena" className="w-5 icon-theme-aware mr-2" />
                                    <p>Duracion</p>
                                </div>
                                <div className="w-full flex justify-between items-center mt-5">
                                    {LABELS_DURACION.map((label, index) => (
                                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="duration"
                                                className="radio radio-xs radio-primary"
                                                checked={valoracion.duracion === index}
                                                onChange={() => onNumberChange("duracion", valoracion.duracion === index ? undefined : index)}
                                            />
                                            <span className={`text-sm transition-colors ${valoracion.duracion === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex w-40 mt-5 mb-2">
                                    <img src="/perfume-info/icons/rating/coin-icon.svg" alt="Logo precio moneda de dolar" className="w-5 icon-theme-aware mr-2" />
                                    <p>Precio</p>
                                </div>
                                <div className="w-full flex justify-between items-center mt-5">
                                    {LABELS_PRECIO.map((label, index) => (
                                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                className="radio radio-xs radio-primary"
                                                checked={valoracion.precio === index}
                                                onChange={() => onNumberChange("precio", valoracion.precio === index ? undefined : index)}
                                            />
                                            <span className={`text-sm transition-all ${valoracion.precio === index ? "text-primary" : "text-base-content/60"} hover:text-primary`}>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex w-40 mt-5 mb-2">
                                    <img src="/perfume-info/icons/rating/star-icon.svg" alt="Logo puntuacion general estrella" className="w-5 icon-theme-aware mr-2" />
                                    <p>Puntuacion general</p>
                                </div>
                                <div className="w-full relative">
                                    <div className="rating flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                name="general"
                                                className="mask mask-star-2 bg-orange-400 hover:scale-125 transition-transform duration-200"
                                                aria-label={`${star} star`}
                                                checked={star === valoracion.general}
                                                onChange={() => onNumberChange("general", valoracion.general === star ? undefined : star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="card-body">
                            <div className="flex gap-6 mb-2 flex-wrap justify-center items-center w-full h-20">
                                <h1 className="text-center text-lg">
                                    Debes <Link className="link hover:link-accent hover:no-underline" to="/registro">registrarte</Link>
                                    &nbsp;o&nbsp;
                                    <Link className="link hover:link-accent hover:no-underline" to="/login">iniciar sesion</Link>
                                    &nbsp;para votar en un perfume.
                                </h1>
                            </div>
                        </div>
                    )}
                </div>

                <div className="divider md:divider-horizontal mt-5 mb-5"></div>
                <div className="card-body w-full md:w-1/2">
                    <h2 className="card-title">Valoracion media</h2>
                    <div>
                        <div className="flex w-40 mt-5 mb-2">
                            <img src="/perfume-info/icons/rating/calendar-icon.svg" alt="Logo epoca del ano calendario" className="w-5 icon-theme-aware mr-2" />
                            <p>Epoca del ano</p>
                        </div>
                        <div className="flex gap-10">
                            {EPOCA.map((estacion) => {
                                const value = 70;
                                return (
                                    <div className="flex flex-col items-center" key={`result-${estacion.key}`}>
                                        <div
                                            className="radial-progress flex"
                                            style={{ "--value": value, "--size": "2.3rem" } as CSSProperties}
                                            aria-valuenow={value}
                                            role="progressbar"
                                        >
                                            <img src={estacion.icon} alt={`Icono de ${estacion.name}`} className="w-4.5" />
                                        </div>
                                        <span className="text-xs font-medium">{value}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <div className="flex w-40 mt-3 mb-4">
                            <img src="/perfume-info/icons/rating/time-icon.svg" alt="Logo duracion reloj de arena" className="w-5 icon-theme-aware mr-2" />
                            <p>Duracion</p>
                        </div>
                        <div className="badge badge-s badge-soft badge-neutral">Buena</div>
                    </div>

                    <div>
                        <div className="flex w-40 mt-3 mb-4">
                            <img src="/perfume-info/icons/rating/coin-icon.svg" alt="Logo precio moneda de dolar" className="w-5 icon-theme-aware mr-2" />
                            <p>Precio</p>
                        </div>
                        <div className="badge badge-s badge-soft badge-neutral">Muy caro</div>
                    </div>

                    <div>
                        <div className="flex w-40 mt-3 mb-4">
                            <img src="/perfume-info/icons/rating/star-icon.svg" alt="Logo puntuacion general estrella" className="w-5 icon-theme-aware mr-2" />
                            <p>Puntuacion general</p>
                        </div>
                        <div className="w-full relative">
                            <div className="rating flex gap-0.5" aria-label="Valoracion general media">
                                <div className="mask mask-star-2 bg-orange-400" />
                                <div className="mask mask-star-2 bg-orange-400" />
                                <div className="mask mask-star-2 bg-orange-400" />
                                <div className="mask mask-star-2 bg-orange-400" />
                                <div className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
