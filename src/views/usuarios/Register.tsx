import { useEffect, useState } from "react";

const THEMES = {
  light: "caramellatte",
  dark: "halloween",
};

export default function Register() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? THEMES.light);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? THEMES.dark : THEMES.light;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-100 transition-colors duration-500">
      
      <div className="absolute top-6 right-6">
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === THEMES.dark}
          />
          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
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
          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>

      <img
        src={theme === THEMES.dark ? "/aromaly-logo-dark.png" : "/aromaly-logo-light.png"}
        alt="Aromaly"
        className="absolute top-6 left-6 w-32"
      />

      <div className="w-[350px] p-8 rounded-2xl bg-base-200/80 backdrop-blur-md shadow-xl text-base-content transition-colors duration-500">
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div>

        <button
          className={`w-full py-3 rounded-full shadow-lg hover:scale-105 transition transform
            ${theme === THEMES.light ? "bg-yellow-400 text-black" : "bg-base-content text-black"}
          `}
        >
          Registrarse
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-base-content/30"></div>
          <span className="mx-2 text-sm text-base-content/70">o</span>
          <div className="flex-1 h-[1px] bg-base-content/30"></div>
        </div>

        <p className="text-center text-xs mt-6 text-base-content/80">
          ¿Ya tienes cuenta? <a href="/login" className="text-accent">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}