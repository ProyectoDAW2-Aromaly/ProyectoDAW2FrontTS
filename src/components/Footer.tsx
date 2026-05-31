import { Link } from "react-router";

export default function Footer(){
    
    return(
        <>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <nav>
                <h6 className="footer-title">Enlaces</h6>
                <Link className="link link-hover" to="/">Inicio</Link>
                <Link className="link link-hover" to="/perfumes">Explorar Perfumes</Link>
                <Link className="link link-hover" to="/premium">Premium</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a href="/" className="link link-hover">Política de privacidad</a>
                <a href="/" className="link link-hover">Términos de uso</a>
                <a href="/" className="link link-hover">Aviso legal</a>
            </nav>
            <nav>
                <h6 className="footer-title">Información</h6>
                <a href="mailto:aromaly@business.com" className="link link-hover">aromaly@business.com</a>
            </nav>
            </footer>
            <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
            <aside className="grid-flow-col items-center">
                <p>
                © 2026 – Aromaly
                <br />
                Proyecto académico | Sitio web informativo. No vendemos perfumes.
                </p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">

                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current">
                    <path d="M18.244 2H21l-6.54 7.47L22 22h-6.828l-5.34-6.98L3.5 22H1l7.02-8.02L2 2h6.828l4.86 6.4L18.244 2zm-1.2 18h1.88L7.08 4H5.1l11.944 16z"/>
                </svg>
                </a>

                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current">
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                </svg>
                </a>
            </div>
            </nav>
            </footer>
        </>
    )
}