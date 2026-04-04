import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const THEMES = {
  light: "caramellatte",
  dark: "halloween",
};

export default function Home() {

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? THEMES.light
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme) setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/home-imgs/hero.png)",
        }}
      >
        <div className="hero-overlay"></div>

        <div
          className={`hero-content text-center ${
            theme === THEMES.dark
              ? "text-black"
              : "text-neutral-content"
          }`}
        >
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">
              Hazte Premium y consigue descuentos exclusivos en tus perfumes favoritos
            </h1>
            <p className="mb-5">
              Descubre, vota y comparte tus perfumes favoritos
            </p>
            <button className="btn btn-primary">
              Obtener Premium
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}