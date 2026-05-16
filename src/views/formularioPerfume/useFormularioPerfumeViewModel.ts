import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    crearPerfume,
    editarPerfume,
    getPerfumeById,
    obtenerNotas,
    obtenerPerfumistas,
    obtenerFamiliasOlfativas
} from "../../services/perfume.services";
import { IPerfumeBackend, INotaBackend, IFamilias } from "../perfume/IPerfume";
import { IMarcaBackend } from "../../interfaces/IMarca";
import { IPerfumistaBackend } from "../perfumista/IPerfumista";
import { obtenerMarcas } from "../../services/marca.services";

const PERFUME_VACIO: IPerfumeBackend = {
    nombre: "",
    descripcion: "",
    genero: "",
    fechaLanzamiento: "",
    coleccion: "",
    foto: "",
    marca: undefined,
    perfumistas: [],
    familiasOlfativas: [],
    notas: [],
};
interface IOpcionSelectores {
    marca: IMarcaBackend[],
    nota: INotaBackend[],
    perfumista: IPerfumistaBackend[],
    familia: IFamilias[];
};

export const useFormularioPerfumeViewModel = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get("edit") ?? params.get("id") ?? undefined;

    const navigate = useNavigate();
    const esModoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState<IPerfumeBackend>(PERFUME_VACIO);
    const [archivo, setArchivo] = useState<File | null>(null);

    const [opcionesSelectores, setOpcionesSelectores] = useState<IOpcionSelectores>({
        marca: [],
        familia: [],
        nota: [],
        perfumista: []
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);

    const cargarDatos = async () => {
        try {
            // TODO: En vez de poner as Interfaz en todos, se quita por la mierda esa de los servicios (comprobar en el resto de viewmodels, si no, pedir rescate técnico)
            const marcas = await obtenerMarcas();
            const notas = await obtenerNotas() as INotaBackend[];
            const perfumistas = await obtenerPerfumistas() as IPerfumistaBackend[];
            const familias = await obtenerFamiliasOlfativas() as IFamilias[];

            setOpcionesSelectores({
                marca: marcas,
                nota: notas,
                perfumista: perfumistas,
                familia: familias
            })

            if (esModoEdicion && id) {
                const perfume = await getPerfumeById(id);

                setFormulario({
                    ...perfume,
                    coleccion: perfume.coleccion ?? "",
                    notas: Array.isArray(perfume.notas) ? perfume.notas : []
                });
            } else {
                setFormulario(PERFUME_VACIO);
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
    }, []);

    const handleChange = (campo: keyof IPerfumeBackend, valor: string | IMarcaBackend | IPerfumistaBackend[] | IFamilias[] | INotaBackend[]) =>
        setFormulario({ ...formulario, [campo]: valor });

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

            formData.append("perfume", JSON.stringify({
                ...formulario
            }))

            if (archivo) {
                formData.append("foto", archivo)
            }

            if (esModoEdicion) {
                await editarPerfume(id!, formData);
            } else {
                await crearPerfume(formData);
            }

            navigate("/perfumes");

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
        opcionesSelectores,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancelar
    };
};