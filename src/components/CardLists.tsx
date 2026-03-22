<div className="card bg-base-100 shadow-sm w-96">
    <div className="card-body flex flex-col justify-between">

        <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista" >
            <button className="btn btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </button>
        </div>

        {/* <div className="tooltip absolute top-2 right-2" data-tip="Guardar lista">
                <button className="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            </div> */}

        <div className="flex flex-wrap gap-6 mb-2 items-center">
            <div className="avatar w-14 shrink-0">
                <div className="w-14 rounded-full">
                    <img src="/user/profile-pic/profile2.jpg" alt="Perfil" />
                </div>
            </div>

            {/* TODO: Investigar una forma de mostrar la descripción del icono. Ejemplo: Premium, Cafés donados, etc */}
            {/* <img src="/user/icons/crown-1.svg" alt="Icono premium cororna" className="absolute top-0.5 left-5 w-8 h-8 -rotate-22"/> */}

            <div className="flex flex-col">
                <h2 className="card-title">Jakob</h2>
                {/* <a href="" className="badge badge-s badge-soft badge-neutral mt-2">Guardar lista</a> */}
            </div>
        </div>


        <div className="divider h-1 my-0"></div>
        <h2 className="font-semibold">HAGO UN TÍTULO LARGO PARA VER COMO QUEDA ASÍ</h2>
        <div className="divider h-1 my-0"></div>

        <div className="avatar-group flex justify-center -space-x-2">
            <div className="avatar">
                <div className="w-12">
                    <img src="/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12">
                    <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12">
                    <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                </div>
            </div>
            <div className="avatar">
                <div className="w-12">
                    <img src="/perfume-info/perfume/lira/xerjoff-lira.jpg" />
                </div>
            </div>
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                    <span>+5</span>
                </div>
            </div>
        </div>
        <button className="btn">Ver lista completa</button>

    </div>
</div>