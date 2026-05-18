import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { crearPerfumista, editarPerfumista, getPerfumistaById } from "../../services/perfumista.services";
import { PERFUMISTA_VACIO } from "../../constantes/constantes";


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
            setPreviewFoto(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async () => {
        setGuardando(true);
        setError(null);

        try {
            const formData = new FormData();

            formData.append("perfumista", JSON.stringify({
                ...formulario
            }));

            if (archivo) {
                formData.append("foto", archivo);
            }
            let tempId = id;

            if (esModoEdicion) {
                await editarPerfumista(id!, formData);
            } else {
                const perfumistaCreado = await crearPerfumista(formData);
                tempId = perfumistaCreado.id;
            }


            navigate("/perfumista/" + tempId);

        } catch (err) {
            console.error(err);
            setError("Error al guardar.");
        } finally {
            setGuardando(false);
        }
    };

    const handleCancelar = () => navigate(-1);

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
    };
};
