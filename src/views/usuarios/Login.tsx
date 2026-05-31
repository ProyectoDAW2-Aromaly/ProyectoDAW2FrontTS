import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormError } from "../../components/FormError";
import UserContext from "../../context/UserContext";
import { doLogin, getUser } from "../../services/usuarios.services";

export default function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | string[] | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    const username = form.username.trim();
    const password = form.password.trim();

    const errores: string[] = [];

    if (!username) {
      errores.push("El nombre de usuario es obligatorio.");
    }

    if (!password) {
      errores.push("La contraseña es obligatoria.");
    }

    if (errores.length > 0) {
      setError(errores);
      return;
    }

    const result = await doLogin({ username, password });

    if (result?.status === 200) {
      userContext?.setUser(getUser());
      navigate("/");
      return;
    }

    setError(result?.mensaje || "No se ha podido iniciar sesión.");
  };

  const usernameError = Boolean(error && !form.username.trim());
  const passwordError = Boolean(error && !form.password.trim());

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200/30 transition-colors duration-500">
      <form onSubmit={handleSubmit} noValidate className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">
          <h1 className="font-semibold text-lg text-center mb-6">INICIAR SESIÓN</h1>

          <input
            name="username"
            type="text"
            className={`input w-full focus:outline-none mb-3 placeholder:text-base-content/50 ${usernameError ? "input-error" : ""}`}
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            aria-invalid={usernameError}
          />

          <input
            name="password"
            type="password"
            className={`input w-full focus:outline-none mb-3 placeholder:text-base-content/50 ${passwordError ? "input-error" : ""}`}
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            aria-invalid={passwordError}
          />

          <FormError message={error} />

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
