// not done yet , still editing 
export default function Login() {
  return (
    
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#bfa18c] to-[#e6ddd6]">
        <img
        src="/aromaly-logo-light.png"
        alt="Aromaly"
        className="absolute top-6 left-6 w-32"
        
        />

      <div className="w-[350px] p-8 rounded-2xl bg-[#bfa18c]/40 backdrop-blur-md shadow-xl">

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-full bg-white/80 shadow-md outline-none"
          />
        </div>

        
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-full bg-white/80 shadow-md outline-none"
          />
        </div>

       
        <div className="flex justify-between text-xs text-gray-700 mb-6">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="checkbox checkbox-xs" />
            Recuérdame
          </label>
          <span className="cursor-pointer">¿Has olvidado la contraseña?</span>
        </div>

        
        <button className="w-full py-3 rounded-full bg-black text-white shadow-lg hover:scale-105 transition">
          Iniciar sesión
        </button>

        
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-400"></div>
          <span className="mx-2 text-gray-600 text-sm">o</span>
          <div className="flex-1 h-[1px] bg-gray-400"></div>
        </div> 
        <p className="text-center text-xs mt-6 text-gray-700">
          ¿No tienes cuenta? Regístrate aquí.
        </p>
      </div>
    </div>
  );
}