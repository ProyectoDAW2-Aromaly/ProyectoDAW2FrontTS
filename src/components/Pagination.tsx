interface IPagination {
    // Esto nos lo pasa el back
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    // Cuando el usuario cambia de página, esto funciona tanto en back como en front. Lo controla el viewmodel de la página que lo utilice.
    handlePageChange: (page: number) => void
}

export default function Pagination({ totalItems, itemsPerPage, handlePageChange }: IPagination) {
    const pages = Math.ceil(totalItems / itemsPerPage);
    return (
        <div className="join flex justify-center mb-10">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            {pages > 5 && <>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">{pages - 1}</button>
                <button className="join-item btn">{pages}</button>
            </>}
        </div>
    )
}

/**
 * Esto para back:
 * 2 parametros a parte de los filtros
 * limit: cuantos items por pagina (12, para que quede simétrico, o múltiple de 2 y 3)
 * offset: por cuantos items has pasado (primera página = 0, segunda 12, tercera 24, etc.). Es la cantidad de items por página multiplicado x el número de página -1.
 */