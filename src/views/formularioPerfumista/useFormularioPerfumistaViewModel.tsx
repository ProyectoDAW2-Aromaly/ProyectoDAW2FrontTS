import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { IPerfumista, IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { crearPerfumista, editarPerfumista, getPerfumistaById } from "../../services/perfumista.services";
import { PERFUMISTA_VACIO } from "../../constantes/constantes";

const ERRORES_VACIOS = {
    nombre: "",
    descripcion: "",
    imagen: ""
}

export const useFormularioPerfumistaViewModel = () => {
    const { search } = useLocation();
    const { id: routeId } = useParams();
    const params = new URLSearchParams(search);
    const id = routeId ?? params.get("edit") ?? params.get("id") ?? undefined;

    const navigate = useNavigate();
    const esModoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState<IPerfumistaBackend>(PERFUMISTA_VACIO);
    const [archivo, setArchivo] = useState<File | null>(null);
    const [previewFoto, setPreviewFoto] = useState("");
    const [erroresCampos, setErroresCampos] = useState<{ [key in keyof IPerfumista]?: string }>(ERRORES_VACIOS)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);

    const cargarDatos = async () => {
        try {
            if (esModoEdicion && id) {
                const perfumista = await getPerfumistaById(id);

                setFormulario({
                    ...perfumista,
                });
                setPreviewFoto(perfumista.foto ?? "");
            } else {
                setFormulario(PERFUMISTA_VACIO);
            }

        } catch (err) {
            console.error(err);
            setError("Error al cargar datos.");
        } finally {
            setLoading(false);
        }
    };

    // Cuando cambie el id, si está vacío, solo una vez al montar
    useEffect(() => {
        cargarDatos();
    }, [id]);

    const handleChange = (campo: keyof IPerfumistaBackend) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setFormulario(prev => ({
                ...prev,
                [campo]: e.target.value
            }));
        };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setArchivo(file);
            // Crea una url temporal para mostar la imagen antes de subirla
            setPreviewFoto(URL.createObjectURL(file));
        }
    }

    const validacion = () => {
        const nombreError = formulario.nombre.trim() === "";
        const descripcionError = formulario.descripcion.trim() === "";
        const fotoError = !archivo && !formulario.foto;

        const nuevosErroresCampos = {
            nombre: nombreError ? "El nombre no debe estar vacío." : undefined,
            descripcion: descripcionError ? "La descripción no debe estar vacía." : undefined,
            imagen: fotoError ? "Debe tener una foto." : undefined,
        }
        setErroresCampos(nuevosErroresCampos)
        return nuevosErroresCampos
    }

    const handleSubmit = async () => {
        // Sacamos el objeto con los errores actuales
        const erroresActuales = validacion()
        // Sacamos los valores de las propiedades del objeto en un array
        const valoresErrores = Object.values(erroresActuales)
        // Si alguno/s (some) cumplen con la condicion que se pone dentro, da true. Si da true es que hay algun error.
        if (valoresErrores.some(valor => valor !== "" && valor !== undefined)) return;

        setGuardando(true);
        setError(null);

        try {
            const formData = new FormData();

            // solamente los datos, se convierte a JSON, sin foto
            formData.append("perfumista", JSON.stringify({
                ...formulario
            }));

            // Si ha seleccionado el archivo, se añade como foto
            if (archivo) {
                formData.append("foto", archivo);
            }

            let tempId = id;

            // comprobación editar/crear
            if (esModoEdicion) {
                // id! = El id 100% existe
                await editarPerfumista(id!, formData);
            } else {
                const perfumistaCreado = await crearPerfumista(formData);
                // Si es nuevo, lo crea y devuelve id
                tempId = perfumistaCreado.id;
            }

            // Para navegar a la página del perfumista
            navigate("/perfumista/" + tempId);

        } catch (err) {
            console.error(err);
            setError("Error al guardar.");
        } finally {
            setGuardando(false);
        }
    };

    const handleCancelar = () => navigate("/");

    return {
        esModoEdicion,
        formulario,
        previewFoto,

        loading,
        error,
        guardando,

        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancelar,
        erroresCampos
    };
};
