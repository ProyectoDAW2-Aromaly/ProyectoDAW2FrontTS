import { Link } from "react-router";

const Premium = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-sm mt-25 mb-25">
                <div className="card-body">
                    <span className="badge badge-xs badge-warning">Popular</span>
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Premium</h2>
                        <span className="text-xl">4.99€/mes</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Creación de listas</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Perfil personalizable</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Nuevos iconos</span>
                        </li>
                        <li className="opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span className="line-through">Poner para compararlo con el gratuito</span>
                        </li>
                        <li className="opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span className="line-through">Poner para compararlo con el gratuito</span>
                        </li>
                    </ul>
                    <div className="mt-6 flex flex-col items-center">
                        {/* Redirigir a Stripe para realizar el pago */}
                        <button className="btn btn-primary btn-block">Suscríbete ya</button>
                        <Link to="/" className="link text-xs mt-2">Seguir con la cuenta gratuita</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Premium;