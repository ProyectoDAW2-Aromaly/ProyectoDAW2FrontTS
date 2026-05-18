import { TGenero } from "../interfaces/IPerfume";
import { IPerfumistaBackend } from "../interfaces/IPerfumista";

export const GENEROS: TGenero[] = [
  'Mujer', 'Hombre', "Unisex"
]

export const PERFUMISTA_VACIO: IPerfumistaBackend = {
    nombre: "",
    descripcion: "",
    foto: "",
};

export const COMENTARIOS = [
    {
        id: "1",
        nombre: "Axel",
        contenido: "Comentario random de este perfume. No se si deberia poner las estrellas que este usuario ha puesto o dejarlo sin estrellas.",
    },
    {
        id: "2",
        nombre: "Axel",
        contenido: "Comentario random de este perfume. No se si deberia poner las estrellas que este usuario ha puesto o dejarlo sin estrellas.",
    },
];