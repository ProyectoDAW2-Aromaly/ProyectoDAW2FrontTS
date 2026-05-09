import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IPerfumistaBackend } from "../perfumista/IPerfumista";
import { crearPerfumista, editarPerfumista, getPerfumistaById } from "../../services/perfumista.services";

const PERFUMISTA_VACIO: IPerfumistaBackend = {
    nombre: "",
    descripcion: "",
    foto: "",
};

export const useFormularioPerfumistaViewModel = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get("edit") ?? params.get("id") ?? undefined;

    const navigate = useNavigate();
    const esModoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState<IPerfumistaBackend>(PERFUMISTA_VACIO);

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

    const handleSubmit = async () => {
        setGuardando(true);
        setError(null);

        try {
            const payload: IPerfumistaBackend = {
                ...formulario,
            };

            if (esModoEdicion) {
                await editarPerfumista(id!, payload);
            } else {
                await crearPerfumista(payload);
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
        handleSubmit,
        handleCancelar,
    };
};