import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import { doLogin, getUser } from "../../servicios/usuarios.services";

export default function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await doLogin(form);

    if (result?.status === 200) {
      userContext?.setUser(getUser());
      navigate("/");
      return;
    }

    setError(result?.mensaje || "Error al iniciar sesión");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200/30 transition-colors duration-500">
      <form onSubmit={handleSubmit} className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">
          <h1 className="font-semibold text-lg text-center mb-6">INICIAR SESIÓN</h1>

          <input
            name="username"
            type="text"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-error text-sm mb-3">{error}</p>}

          <button className="btn btn-neutral hover:btn-accent text-primary-content" type="submit">
            Iniciar sesión
          </button>

          <div className="divider">o</div>

          <p className="text-center text-xs text-base-content/80">
            ¿No tienes cuenta? <Link to="/registro" className="text-accent">Regístrate aquí.</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
