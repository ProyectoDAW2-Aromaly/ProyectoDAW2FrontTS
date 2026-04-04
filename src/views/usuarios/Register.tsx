export default function Register() {


  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-100 transition-colors duration-500">
      <div className="w-sm bg-base-100 shadow-lg rounded-2xl p-6">
      <div className="card-body">

        <h1 className="font-semibold text-lg text-center mb-6">REGISTRO</h1>
        
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div> */}

        {/* <label className="label text-neutral font-semibold">Nombre</label> */}
        <input type="text" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Nombre" />

        {/* <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div> */}

        <input type="email" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Email" />

        {/* <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div> */}
        
        <input type="password" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Contraseña" />

        <input type="password" className="input w-full focus:outline-none mb-3 placeholder:text-base-content/50" placeholder="Confirmar contraseña" />

        {/* <div className="mb-4">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full px-5 py-3 rounded-full bg-base-100/50 shadow-md outline-none placeholder:text-base-content/50 transition-colors duration-500"
          />
        </div>*/}
        <button className="btn btn-neutral hover:btn-accent text-primary-content">Registrarse</button> 

        <div className="divider">o</div>

        <p className="text-center text-xs text-base-content/80">
          ¿Ya tienes cuenta? <a href="/login" className="text-accent">Inicia sesión</a>
        </p>
      </div>
      </div>
    </div>
  );
}