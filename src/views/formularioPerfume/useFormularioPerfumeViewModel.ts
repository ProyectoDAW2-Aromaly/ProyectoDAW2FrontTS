import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
    crearPerfume,
    editarPerfume,
    getPerfumeById,
} from "../../services/perfume.services";
import { IPerfumeBackend, INotaBackend, IFamilias, IPerfume } from "../../interfaces/IPerfume";
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

const ERRORES_VACIOS = {
    nombre: "",
    descripcion: "",
    familiasOlfativas: "",
    genero: "",
    imagen: "",
    perfumistas: "",
    notas: "",
    marca: ""
}
interface IOpcionSelectores {
    marca: IMarcaBackend[],
    nota: INotaBackend[],
    perfumista: IPerfumistaBackend[],
    familia: IFamilias[];
};

export const useFormularioPerfumeViewModel = () => {
    const { search } = useLocation();
    const { id: routeId } = useParams();
    const params = new URLSearchParams(search);
    const id = routeId ?? params.get("edit") ?? params.get("id") ?? undefined;

    const navigate = useNavigate();
    const esModoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState<IPerfumeBackend>(PERFUME_VACIO);
    const [archivo, setArchivo] = useState<File | null>(null);
    const [previewFoto, setPreviewFoto] = useState("");
    const [erroresCampos, setErroresCampos] = useState<{ [key in keyof IPerfume]?: string }>(ERRORES_VACIOS)

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

    const validacion = () => {
        const nombreError = formulario.nombre.trim() === "";
        const descripcionError = formulario.descripcion.trim() === "";
        const marcaError = !formulario.marca?.nombre?.trim();
        const perfumistaError = (formulario.perfumistas?.length ?? 0) === 0;
        const notaError = (formulario.notas?.length ?? 0) === 0;
        const familiaError = (formulario.familiasOlfativas?.length ?? 0) === 0;
        const fotoError = !archivo && !formulario.foto;
        const generoError = formulario.genero.trim() === "";

        const nuevosErroresCampos = {
            nombre: nombreError ? "El nombre no debe estar vacío." : undefined,
            descripcion: descripcionError ? "La descripción no debe estar vacía." : undefined,
            marca: marcaError ? "Debe tener una marca." : undefined,
            perfumistas: perfumistaError ? "Debe tener al menos un perfumista." : undefined,
            notas: notaError ? "Debe tener al menos una nota." : undefined,
            familiasOlfativas: familiaError ? "Debe tener al menos una familia olfativa." : undefined,
            imagen: fotoError ? "Debe tener una foto." : undefined,
            genero: generoError ? "Debe tener un género." : undefined,
        }
        setErroresCampos(nuevosErroresCampos)
        return nuevosErroresCampos
    }

    const handleSubmit = async () => {
        // Sacamos el objeto con los errores actuales
        const erroresActuales = validacion()
        // Sacamos los valores de las propiedades del objeto en un array
        const valoresErrores = Object.values(erroresActuales)
        // SI alguno/s (some) cumplen con la condicion que se pone dentro, da true. Si da true es que hay algun error.
        if (valoresErrores.some(valor => valor !== "" && valor !== undefined)) return;

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

    const handleCancelar = () => navigate("/");

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
        handleCancelar,
        erroresCampos
    };
};
