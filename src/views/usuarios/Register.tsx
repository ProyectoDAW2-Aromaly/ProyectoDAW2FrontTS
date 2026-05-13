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

    if (form.password !== form.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const result = await saveUser({
      username: form.username,
      email: form.email,
      password: form.password,
      descripcion: "",
      foto: "/user/profile-pic/profile1.jpg",
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
          />

          <input
            name="email"
            type="email"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Email"
            value={form.email}
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

          <input
            name="repeatPassword"
            type="password"
            className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50"
            placeholder="Confirmar contraseña"
            value={form.repeatPassword}
            onChange={handleChange}
          />

          {error && <p className="text-error text-sm mb-3">{error}</p>}

          <button className="btn btn-neutral hover:btn-accent text-primary-content" type="submit">
            Registrarse
          </button>

          <div className="divider">o</div>

          <p className="text-center text-xs text-base-content/80">
            ¿Ya tienes cuenta? <Link to="/login" className="text-accent">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
