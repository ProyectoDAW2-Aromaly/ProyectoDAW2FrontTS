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
                        <h2 className="card-title ml-1">LIRA</h2>
                        <button className="btn btn-ghost bg-[#FFF7ED] rounded-2xl"> {/*Habría que mirar qué hacer cuando es el tema oscuro*/}
                            <figure className="w-auto h-5">
                                <img 
                                    src="/perfume-info/xerjoff-logo.png" 
                                    alt="Logo de la marca" 
                                    className="w-full h-full object-contain"
                                    />
                            </figure>
                        </button>
                        <p>Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story. 
                            Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.
                            <br/>
                            <br/>
                            Lira is based on a perfume originally released by Casamorati in the late 1800s that was created to help a beautiful, aspiring actress realise her dreams. 
                            It was intended to make a lasting impression on all those who encountered it, just like the sweet music of the lyre.
                        </p>
                        <div className="divider">Info</div>
                        <h5>Familia olfativa: Poner las chip (oriental, floral, gourdmand)</h5>
                        <h5>Genero (poner la imagen del género)</h5> {/* https://www.svgrepo.com/ svg gratis */}
                        <h5>Perfumista (a)</h5>
                        <h5>Fecha de lanzamiento</h5>

                        {/* <p>Sus notas base son: Naranja roja, lavanda, bergamota (top). Canela, jazmin, rosa (corazón). Caramelo, almizcle, vainilla (base)</p> */}

                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfumePage;