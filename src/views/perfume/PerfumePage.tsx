import Navbar from "../../components/Navbar";

const PerfumePage = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                <div className="card card-side bg-base-100 shadow-sm">
                    <figure className="w-4xl h-auto">
                        <img
                            src="/perfume-info/xerjoff-lira.jpg"
                            alt="Lira Xerjoff"
                        />
                    </figure>
                    <div className="card-body items-start">
                        <h1 className="card-title ml-2">LIRA</h1>
                        <button className="btn btn-ghost bg-[#FFF7ED] rounded-2xl self-start p-2 h-auto min-h-0"> {/*Habría que mirar qué hacer cuando es el tema oscuro*/}
                            <figure className="w-auto h-5">
                                <img
                                    src="/perfume-info/xerjoff-logo.png"
                                    alt="Logo de la marca"
                                />
                            </figure>
                        </button>
                        <div className="divider">Descripción</div>
                        <p> Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story.
                            Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.
                            <br />
                            <br />
                            Lira is based on a perfume originally released by Casamorati in the late 1800s that was created to help a beautiful, aspiring actress realise her dreams.
                            It was intended to make a lasting impression on all those who encountered it, just like the sweet music of the lyre.
                        </p>
                        <div className="divider">Información general</div>
                        <h5>Familia olfativa:
                            <a href="" className="badge badge-xs badge-soft badge-neutral ml-2">Oriental</a>
                            <a href="" className="badge badge-xs badge-soft badge-neutral ml-2">Floral</a>
                            <a href="" className="badge badge-xs badge-soft badge-neutral ml-2">Gourmand</a>
                        </h5>
                        <h5 className="flex items-center">
                            Género
                            <figure >
                                <img
                                    src="/perfume-info/icons/genre/female-icon.svg"
                                    alt="Icono de género"
                                    className="w-5 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5> {/* https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis */}
                        <h5>Perfumista: <a href="">Chris Maurice</a></h5>
                        <h5>Fecha de lanzamiento: 2011</h5>

                        {/* <p>Sus notas base son: Naranja roja, lavanda, bergamota (top). Canela, jazmin, rosa (corazón). Caramelo, almizcle, vainilla (base)</p> */}
                    </div>
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">PIRÁMIDE OLFATIVA</h1>
                <div className="flex flex-wrap gap-12">
                    <div className="card card-border bg-base-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Notas de salida</h2>

                            <div className="flex flex-wrap gap-6 mb-4">
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/naranja-roja.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/lavanda.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/bergamota.jpg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a href="" className="badge badge-s badge-soft badge-neutral">Naranja roja</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Lavanda</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Bergamota</a>
                            </div>

                        </div>
                    </div>
                    <div className="card card-border bg-base-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Notas de salida</h2>

                            <div className="flex flex-wrap gap-6 mb-4">
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/canela.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/jazmin.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/rosa.jpg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a href="" className="badge badge-s badge-soft badge-neutral">Canela</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Jazmín</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Rosa</a>
                            </div>

                        </div>
                    </div>
                    <div className="card card-border bg-base-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Notas de salida</h2>

                            <div className="flex flex-wrap gap-6 mb-4">
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/caramelo.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/almizcle.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src="/perfume-info/notas/vainilla.jpeg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a href="" className="badge badge-s badge-soft badge-neutral">Caramelo</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Almizcle</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Vainilla</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Prueba</a>
                                <a href="" className="badge badge-s badge-soft badge-neutral">Prueba</a>
                            </div>

                        </div>
                    </div>
                </div>

                <h1 className="text-2xl text-center mb-10 mt-10">VALORACIONES</h1>
                <div className="card card-border bg-base-100 w-auto">
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