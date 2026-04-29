import { Link } from "react-router";
import Navbar from "../../components/Navbar";

export default function Home() {

  return (
    <div>
      <Navbar />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/home-imgs/hero.png)",
        }}
      >

        <div className="absolute inset-0 bg-black/40"></div>

        <div
          className="hero-content text-center" style={{ color: "#FFC889" }}
        >
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold ">
              Hazte Premium y consigue descuentos exclusivos en tus perfumes favoritos
            </h1>
            <p className="mb-5">
              Descubre, vota y comparte tus perfumes favoritos
            </p>
            <Link to="/premium" className="btn btn-primary">
              Obtener Premium
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}