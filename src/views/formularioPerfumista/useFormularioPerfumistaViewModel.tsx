import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { crearPerfumista, editarPerfumista, getPerfumistaById } from "../../services/perfumista.services";
import { PERFUMISTA_VACIO } from "../../constantes/constantes";


export const useFormularioPerfumistaViewModel = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get("edit") ?? params.get("id") ?? undefined;

    const navigate = useNavigate();
    const esModoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState<IPerfumistaBackend>(PERFUMISTA_VACIO);
    const [archivo, setArchivo] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            try {

                if (esModoEdicion && id) {
                    const perfumista = await getPerfumistaById(id);

                    setFormulario({
                        ...perfumista,
                    });
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
            setArchivo(e.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        setGuardando(true);
        setError(null);

        try {

            const formData = new FormData();

            formData.append("perfumista", JSON.stringify(
                {
                    nombre: formulario.nombre,
                    descripcion: formulario.descripcion,
                    foto: formulario.foto
                }
            ));

            if (archivo) {
                formData.append("foto", archivo);
            }

            if (esModoEdicion) {
                await editarPerfumista(id!, formData);
            } else {
                await crearPerfumista(formData);
            }

            navigate("/");

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

        loading,
        error,
        guardando,

        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancelar,
    };
};