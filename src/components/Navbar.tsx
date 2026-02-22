import { useEffect, useState } from "react";

// Es como un selector. Te limita solo a esas Strings, en este caso los temas de Daisy. Dark -> luxury | halloween | cofee . Light: caramellatte | garden | retro
const THEMES = {
  "light": "caramellatte",
  "dark": "halloween"
}

export default function Navbar() {
  // THEMES -> Solo puede ser luxury o caramellatte. theme -> Guarda el tema actual. setTheme -> Cambia el tema.
  const [theme, setTheme] = useState(
    // ?? -> Si el tema guardado en localStorage no es null, se usa el que está puesto, si es null, tema claro por defecto
    localStorage.getItem("theme") ?? THEMES.light
  )

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? THEMES.dark : THEMES.light;
    setTheme(newTheme)
  }

  // Ejecuta esto solo cuando el estado theme cambie
  useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme)
  }, [theme])

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul className="menu dropdown-content bg-base-200 rounded-box w-56">
            <li><a>Inicio</a></li>
            <li>
              <details open>
                <summary>Perfumes</summary>
                <ul>
                  <li><a>Populares</a></li>
                  <li><a>Por notas</a></li>
                  <li><a>Marca</a></li>
                </ul>
              </details>
            </li>
            <li><a>Perfumista</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="" className="text-xl">
          <img 
            src={theme === THEMES.dark ? "/aromaly-logo-dark.png" : "/aromaly-logo-light.png"} 
            alt="Logo Aromaly"
          />
        </a>
      </div>
      <div className="navbar-end">
        {showSearch && (
          <input 
            type="text" 
            placeholder="Buscar..."
            autoFocus
            className="input input-bordered ml-2 mr-2 w-48 transition-all duration-500 ease-out ${show}" 
          />
        )}
        <button 
          className="btn btn-ghost btn-circle mr-3"
          // Si showSearch es false, !showSearch es true, y del revés. Cambia el estado al valor opuesto.
          onClick={() => setShowSearch(!showSearch)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
        </button>
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-3">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-1 w-30 p-2 shadow">
        <li><a>Perfil</a></li>
        <li><a>Ajustes</a></li>
        <div className="divider"></div>
        <li><button className="btn btn-xs btn-accent">PREMIUM</button></li>
      </ul>
      </div>

        <label className="toggle text-base-content mr-5">
          <input type="checkbox" onChange={handleToggle} checked={theme === THEMES.dark} className="theme-controller" />

          <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

        </label>
      </div>
    </div>
  )
}