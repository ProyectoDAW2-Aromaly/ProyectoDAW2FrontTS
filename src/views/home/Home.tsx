//still editing not the last version

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(../../../public/home-imgs/hero.png)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">El universo del perfume, en un solo lugar</h1>
            <p className="mb-5">
              Descubre, vota y comparte tus perfumes favoritos
            </p>
            <button className="btn btn-primary">Explorar ahora</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}