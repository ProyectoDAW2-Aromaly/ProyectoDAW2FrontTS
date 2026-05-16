import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    crearPerfume,
    editarPerfume,
    getPerfumeById,
} from "../../services/perfume.services";
import { IPerfumeBackend, INotaBackend, IFamilias } from "../../interfaces/IPerfume";
import { IMarcaBackend } from "../../interfaces/IMarca";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { obtenerMarcas } from "../../services/marca.services";
import { obtenerNotas } from "../../services/nota.services";
import { obtenerPerfumistas } from "../../services/perfumista.services";
import { obtenerFamiliasOlfativas } from "../../services/familia.services";

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
    const [previewFoto, setPreviewFoto] = useState("");

    const [opcionesSelectores, setOpcionesSelectores] = useState<IOpcionSelectores>({
        marca: [],
        familia: [],
        nota: [],
        perfumista: []
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        console.log(formulario)
    }, [formulario])

    const cargarDatos = async () => {
        try {
            const marcas = await obtenerMarcas();
            const notas = await obtenerNotas();
            const perfumistas = await obtenerPerfumistas();
            const familias = await obtenerFamiliasOlfativas();

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
                setPreviewFoto(perfume.foto ?? "");
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

            formData.append("perfume", JSON.stringify({
                ...formulario
            }))

            if (archivo) {
                formData.append("foto", archivo)
            }
            let tempId = id

            if (esModoEdicion) {
                await editarPerfume(id!, formData);
            } else {
                const perfumeCreado = await crearPerfume(formData);
                tempId = perfumeCreado.id
            }

            navigate("/perfume/" + tempId);


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
        opcionesSelectores,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancelar
    };
};