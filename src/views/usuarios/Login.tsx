export default function Login() {

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-100 transition-colors duration-500">
      <div className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
        <div className="card-body">

          <h1 className="font-semibold text-lg text-center mb-6">INICIAR SESIÓN</h1>

          <input type="email" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Email" />

          <input type="password" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Contraseña" />

          <div className="flex justify-between text-xs text-base-content mb-6">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="checkbox checkbox-xs" />
              Recuérdame
            </label>
            <a className="link link-hover">¿Has olvidado la contraseña?</a>
          </div>
          

          <button className="btn btn-neutral hover:btn-accent text-primary-content">Registrarse</button>

          <div className="divider">o</div>

          <p className="text-center text-xs text-base-content/80">
            ¿No tienes cuenta? <a href="/registro" className="text-accent">Regístrate aquí.</a>
          </p>
        </div>
      </div>
    </div>
  );
}