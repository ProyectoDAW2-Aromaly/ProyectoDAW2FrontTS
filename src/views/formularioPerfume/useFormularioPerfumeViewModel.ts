// import { ChangeEvent, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import {
//     crearPerfume,
//     editarPerfume,
//     getPerfumeById,
//     obtenerMarcas,
//     obtenerNotas,
//     obtenerPerfumistas,
//     obtenerFamiliasOlfativas,
//     obtenerColecciones
// } from "../../services/perfume.services";
// import { IPerfumeBackend, ItemListado, INotaBackend } from "../perfume/IPerfume";

// const PERFUME_VACIO: IPerfumeBackend = {
//     nombre: "",
//     descripcion: "",
//     genero: "",
//     fechaLanzamiento: "",
//     coleccion: "",
//     foto: "",
//     marca: undefined,
//     perfumistas: [],
//     familiasOlfativas: [],
//     notas: [],
// };

export const useFormularioPerfumeViewModel = () => {
    // const { search } = useLocation();
    // const params = new URLSearchParams(search);
    // const id = params.get("edit") ?? params.get("id") ?? undefined;

    // const navigate = useNavigate();
    // const esModoEdicion = Boolean(id);

    // const [formulario, setFormulario] = useState<IPerfumeBackend>(PERFUME_VACIO);

    // const [marcasDisponibles, setMarcasDisponibles] = useState<string[]>([]);
    // const [notasDisponibles, setNotasDisponibles] = useState<string[]>([]);
    // const [perfumistasDisponibles, setPerfumistasDisponibles] = useState<{ id: string, nombre: string }[]>([]);
    // const [familiasDisponibles, setFamiliasDisponibles] = useState<string[]>([]);
    // const [coleccionesDisponibles, setColeccionesDisponibles] = useState<string[]>([]);

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    // const [guardando, setGuardando] = useState(false);

    // useEffect(() => {
    //     const cargarDatos = async () => {
    //         try {
    //             const [
    //                 marcas,
    //                 notas,
    //                 perfumistas,
    //                 familias,
    //                 colecciones
    //             ] = await Promise.all([
    //                 obtenerMarcas(),
    //                 obtenerNotas(),
    //                 obtenerPerfumistas(),
    //                 obtenerFamiliasOlfativas(),
    //                 obtenerColecciones().catch(() => [])
    //             ]);

    //             setMarcasDisponibles(marcas.map((m: ItemListado) => m.nombre));
    //             setNotasDisponibles(notas.map((m: ItemListado) => m.nombre));
    //             setPerfumistasDisponibles(perfumistas);
    //             setFamiliasDisponibles(familias.map((m: ItemListado) => m.nombre));
    //             setColeccionesDisponibles(colecciones.map((c: any) => c.coleccion));

    //             if (esModoEdicion && id) {
    //                 const perfume = await getPerfumeById(id);

    //                 setFormulario({
    //                     ...perfume,
    //                     coleccion: perfume.coleccion || "",
    //                     notas: Array.isArray(perfume.notas) ? perfume.notas : []
    //                 });
    //             }

    //         } catch (err) {
    //             console.error(err);
    //             setError("Error al cargar datos.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     cargarDatos();
    // }, [id]);

    // const handleChange = (campo: keyof IPerfumeBackend) =>
    //     (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //         setFormulario(prev => ({
    //             ...prev,
    //             [campo]: e.target.value
    //         }));
    //     };

    // const handleFamiliasChange = (seleccionadas: string[]) => {
    //     setFormulario(prev => ({
    //         ...prev,
    //         familiasOlfativas: seleccionadas.map(nombre => ({ nombre }))
    //     }));
    // };

    // const handleNotasChange =
    //     (tipo: "salida" | "corazon" | "base") =>
    //         (nombres: string[]) => {
    //             setFormulario(prev => {
    //                 const notasPrevias = (prev.notas as INotaBackend[]) ?? [];

    //                 // elimina las del mismo tipo
    //                 const filtradas = notasPrevias.filter(n => n.tipo !== tipo);

    //                 const nuevas = nombres.map(nombre => ({
    //                     nombre,
    //                     foto: "",
    //                     tipo
    //                 }));

    //                 return {
    //                     ...prev,
    //                     notas: [...filtradas, ...nuevas]
    //                 };
    //             });
    //         };

    // const handlePerfumistasChange = (nombres: string[]) => {
    //     setFormulario(prev => ({
    //         ...prev,
    //         perfumistas: nombres
    //             .map(nombre => {
    //                 const encontrado = perfumistasDisponibles.find(p => p.nombre === nombre);
    //                 const original = prev.perfumistas?.find(p => p.nombre === nombre);

    //                 const id = encontrado?.id ?? original?.id;
    //                 if (!id) return null;

    //                 return { id, nombre };
    //             })
    //             .filter(Boolean) as { id: string, nombre: string }[]
    //     }));
    // };

    // const handleSubmit = async () => {
    //     setGuardando(true);
    //     setError(null);

    //     try {
    //         const payload: IPerfumeBackend = {
    //             ...formulario,
    //             marca: typeof formulario.marca === "string"
    //                 ? { nombre: formulario.marca, foto: "" }
    //                 : formulario.marca
    //         };

    //         if (esModoEdicion) {
    //             await editarPerfume(id!, payload);
    //         } else {
    //             await crearPerfume(payload);
    //         }

    //         navigate(-1);

    //     } catch (err) {
    //         console.error(err);
    //         setError("Error al guardar.");
    //     } finally {
    //         setGuardando(false);
    //     }
    // };

    // const handleCancelar = () => navigate(-1);

    // const notasSeleccionadas = (tipo: "salida" | "corazon" | "base") =>
    // (formulario.notas as INotaBackend[] ?? [])
    //     .filter(n => n.tipo === tipo)
    //     .map(n => n.nombre);

    // const perfumistasSeleccionados =
    //     formulario.perfumistas?.map(p => p.nombre) ?? [];

    // const familiasSeleccionadas =
    //     (formulario.familiasOlfativas ?? []).map(f =>
    //         typeof f === "string" ? f : f.nombre
    //     );

    // return {
    //     esModoEdicion,
    //     formulario,

    //     marcasDisponibles,
    //     notasDisponibles,
    //     perfumistasDisponibles,
    //     familiasDisponibles,
    //     coleccionesDisponibles,

    //     notasSeleccionadas,
    //     perfumistasSeleccionados,
    //     familiasSeleccionadas,

    //     loading,
    //     error,
    //     guardando,

    //     handleChange,
    //     handleFamiliasChange,
    //     handleNotasChange,
    //     handlePerfumistasChange,
    //     handleSubmit,
    //     handleCancelar,
    // };
};