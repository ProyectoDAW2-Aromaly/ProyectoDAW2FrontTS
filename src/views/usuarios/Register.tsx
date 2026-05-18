import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { saveUser } from "../../services/usuarios.services";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
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

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    const repeatPassword = form.repeatPassword.trim();

    if (!username || !email || !password || !repeatPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Introduce un email valido");
      return;
    }

    if (password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres");
      return;
    }

    if (password !== repeatPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }

    const result = await saveUser({
      username,
      email,
      password,
      descripcion: "",
      foto: "",
      rol: "BASICO",
    });

    if (result?.status === 201) {
      navigate("/login");
      return;
    }

    setError(result?.mensaje || "Error al registrar el usuario");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200/30 transition-colors duration-500">
      <form onSubmit={handleSubmit} className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">
          <h1 className="font-semibold text-lg text-center mb-6">REGISTRO</h1>

          <input
            name="username"
            type="text"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Contrasena"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <input
            name="repeatPassword"
            type="password"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Confirmar contrasena"
            value={form.repeatPassword}
            onChange={handleChange}
            minLength={6}
            required
          />

          {error && <p className="text-error text-sm mb-3">{error}</p>}

          <button className="btn btn-neutral hover:btn-accent text-primary-content" type="submit">
            Registrarse
          </button>

          <div className="divider">o</div>

          <p className="text-center text-xs text-base-content/80">
            Ya tienes cuenta? <Link to="/login" className="text-accent">Inicia sesion</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
