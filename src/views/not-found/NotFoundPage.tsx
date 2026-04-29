import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-semibold mt-4 mb-2">Página no encontrada</h2>
                <p className="text-lg text-base-content/70 mb-8">
                    Lo sentimos, no pudimos encontrar la página que buscas.
                </p>
                <Link 
                    to="/" 
                    className="btn btn-primary btn-lg"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
