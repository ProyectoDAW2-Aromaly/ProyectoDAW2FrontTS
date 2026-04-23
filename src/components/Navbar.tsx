import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import UserContext from "../context/UserContext";
import { logout } from "../servicios/usuarios.services";

// ^ Es como un selector. Te limita solo a esas Strings, en este caso los temas de Daisy. Dark -> luxury | halloween | cofee . Light: caramellatte | garden | retro
const THEMES = {
  light: "caramellatte",
  dark: "halloween",
};

export default function Navbar() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const user = userContext?.user;

  // ^ THEMES -> Solo puede ser luxury o caramellatte. theme -> Guarda el tema actual. setTheme -> Cambia el tema.
  const [theme, setTheme] = useState(
    // ^ ?? -> Si el tema guardado en localStorage no es null, se usa el que está puesto, si es null, tema claro por defecto
    localStorage.getItem("theme") ?? THEMES.light
  );

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? THEMES.dark : THEMES.light;
    setTheme(newTheme);
  };

  const handleLogout = () => {
    logout();
    userContext?.setUser(null);
    navigate("/");
  };

  // ^ Ejecuta esto solo cuando el estado theme cambie
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-sm h-auto min-h-24 md:min-h-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul className="menu dropdown-content bg-base-200 rounded-box w-56">
            <li><Link to="/">Inicio</Link></li>
            <li>
              <details open>
                <summary>Perfumes</summary>
                <ul>
                  <li><Link to="/perfumes">Todos</Link></li>
                  <li><Link to="/brands">Marcas</Link></li>
                </ul>
              </details>
            </li>
            <li><Link to="/lists">Listas de usuarios</Link></li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link to="/" className="text-xl">
          <img
            src={theme === THEMES.dark ? "/aromaly-logo-dark.png" : "/aromaly-logo-light.png"}
            alt="Logo Aromaly"
          />
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle mr-3"
            onClick={() => (document.getElementById("search_modal") as HTMLDialogElement).showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <dialog id="search_modal" className="modal items-start">
            <div className="modal-box relative mt-20 p-3 w-11/12 max-w-6xl">
              <label className="input flex items-center gap-2 w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>

                <input
                  type="search"
                  required
                  placeholder="Search"
                  className="grow"
                />
              </label>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>
                close
              </button>
            </form>
          </dialog>
        </div>

        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-3">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={user.pfp || "/user/profile-pic/profile1.jpg"} />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-1 w-30 p-2 shadow">
                <li><Link to="/perfil">Perfil</Link></li>
                <li><a>Ajustes</a></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>

                {user.rol === "BASICO" && (
                  <>
                    <div className="divider"></div>
                    <li>
                      <Link to="/premium" className="btn btn-xs btn-accent">
                        PREMIUM
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </>
          ) : (
            <div className="btn btn-ghost btn-circle avatar mr-3">
              <div className="w-10 rounded-full">
                <Link to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        <label className="toggle text-base-content mr-5">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === THEMES.dark}
            className="theme-controller"
          />

          <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
}
