interface IPaginacion {
    totalItems: number,
    itemsPorPagina: number,
    paginaActual: number,
    handleCambiarPagina: (pagina: number) => void
}

export default function Paginacion({ totalItems, itemsPorPagina, paginaActual, handleCambiarPagina }: IPaginacion) {
    const paginas = Math.ceil(totalItems / itemsPorPagina);

    return <div className="join flex justify-center mb-10">
        <button
            className={`join-item btn ${(paginaActual === 1 || totalItems === 0) && "btn-disabled"}`}
            onClick={() => handleCambiarPagina(1)}>
            <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <title>arrow-skip-back</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                        <path d="M15.8,24,26.4,34.6a1.9,1.9,0,0,1-.2,3,2.1,2.1,0,0,1-2.7-.2l-11.9-12a1.9,1.9,0,0,1,0-2.8l11.9-12a2.1,2.1,0,0,1,2.7-.2,1.9,1.9,0,0,1,.2,3Z" />
                        <path d="M27.8,24,38.4,34.6a1.9,1.9,0,0,1-.2,3,2.1,2.1,0,0,1-2.7-.2l-11.9-12a1.9,1.9,0,0,1,0-2.8l11.9-12a2.1,2.1,0,0,1,2.7-.2,1.9,1.9,0,0,1,.2,3Z" />
                    </g>
                </g>
            </svg>
        </button>
        <button
            className={`join-item btn ${(paginaActual === 1 || totalItems === 0) && "btn-disabled"}`}
            onClick={() => handleCambiarPagina(paginaActual - 1)}
        >
            <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <title>arrowhead-left</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                        <path d="M20.8,24,31.4,13.4a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-11.9,12a1.9,1.9,0,0,0,0,2.8l11.9,12a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3Z" />
                    </g>
                </g>
            </svg>
        </button>
        <button className="join-item btn btn-primary">{paginaActual}</button>
        <button
            className={`join-item btn ${(paginaActual === paginas || totalItems === 0) && "btn-disabled"}`}
            onClick={() => handleCambiarPagina(paginaActual + 1)}
        >
            <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <title>arrowhead-right</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                        <path d="M27.2,24,16.6,34.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l11.9-12a1.9,1.9,0,0,0,0-2.8l-11.9-12a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3Z" />
                    </g>
                </g>
            </svg>
        </button>
        <button
            className={`join-item btn ${(paginaActual === paginas || totalItems === 0) && "btn-disabled"}`}
            onClick={() => handleCambiarPagina(paginas)}
        >
            <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <title>arrow-skip-forward</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none" />
                        <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                        <path d="M33.2,24,22.6,34.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l11.9-12a1.9,1.9,0,0,0,0-2.8l-11.9-12a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3Z" />
                        <path d="M21.2,24,10.6,34.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l11.9-12a1.9,1.9,0,0,0,0-2.8l-11.9-12a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3Z" />
                    </g>
                </g>
            </svg>
        </button>
    </div>
}
