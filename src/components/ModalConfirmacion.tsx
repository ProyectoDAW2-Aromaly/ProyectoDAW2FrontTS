interface ModalConfirmacionProps {
    id: string;
    titulo?: string;
    mensaje: string;
    onCancelar: () => void;
    onConfirmar: () => void;
    loading?: boolean;
}

export const ModalConfirmacion = ({
    id,
    titulo = "Confirmar",
    mensaje,
    onCancelar,
    onConfirmar,
    loading = false,
}: ModalConfirmacionProps) => {

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{titulo}</h3>
                <p className="py-4">{mensaje}</p>

                <div className="modal-action">

                    <button
                        className="btn"
                        onClick={onCancelar}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn btn-error"
                        onClick={onConfirmar}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Eliminar"
                        )}
                    </button>

                </div>
            </div>
        </dialog>
    );
}