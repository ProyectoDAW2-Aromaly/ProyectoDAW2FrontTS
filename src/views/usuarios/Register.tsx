import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormError } from "../../components/FormError";
import { saveUser } from "../../services/usuarios.services";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
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
    const email = form.email.trim();
    const password = form.password.trim();
    const repeatPassword = form.repeatPassword.trim();

    const errores: string[] = [];

    if (!username) {
      errores.push("El nombre de usuario es obligatorio.");
    } else if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
      errores.push(`El nombre de usuario debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres.`);
    }

    if (!email) {
      errores.push("El email es obligatorio.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.push("Introduce un email válido.");
    }

    if (!password) {
      errores.push("La contraseña es obligatoria.");
    } else if (password.length < 6) {
      errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (!repeatPassword) {
      errores.push("Confirmar la contraseña es obligatorio.");
    } else if (password && password !== repeatPassword) {
      errores.push("Las contraseñas no coinciden.");
    }

    if (errores.length > 0) {
      setError(errores);
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

    setError(result?.mensaje || "No se ha podido registrar al usuario. Revisa los datos introducidos.");
  };

  const usernameError = Boolean(error && (
    !form.username.trim() ||
    form.username.trim().length < USERNAME_MIN_LENGTH ||
    form.username.trim().length > USERNAME_MAX_LENGTH
  ));
  const emailError = Boolean(error && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())));
  const passwordError = Boolean(error && form.password.trim().length < 6);
  const repeatPasswordError = Boolean(error && form.repeatPassword.trim() !== form.password.trim());

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200/30 transition-colors duration-500">
      <form onSubmit={handleSubmit} noValidate className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">
          <h1 className="font-semibold text-lg text-center mb-6">REGISTRO</h1>

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
            name="email"
            type="email"
            className={`input w-full focus:outline-none mb-3 placeholder:text-base-content/50 ${emailError ? "input-error" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={emailError}
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

          <input
            name="repeatPassword"
            type="password"
            className={`input w-full focus:outline-none mb-3 placeholder:text-base-content/50 ${repeatPasswordError ? "input-error" : ""}`}
            placeholder="Confirmar contraseña"
            value={form.repeatPassword}
            onChange={handleChange}
            aria-invalid={repeatPasswordError}
          />

          <FormError message={error} />

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
