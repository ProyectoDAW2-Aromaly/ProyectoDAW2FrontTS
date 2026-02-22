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
                        <p>Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story. 
                            Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.
                            <br/>
                            <br/>
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
                                    className="w-7 ml-2 icon-theme-aware"
                                />
                            </figure>
                        </h5> {/* https://www.svgrepo.com/ https://allsvgicons.com/ svg gratis */}
                        <h5>Perfumista (a)</h5>
                        <h5>Fecha de lanzamiento: 2011</h5>

                        {/* <p>Sus notas base son: Naranja roja, lavanda, bergamota (top). Canela, jazmin, rosa (corazón). Caramelo, almizcle, vainilla (base)</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfumePage;