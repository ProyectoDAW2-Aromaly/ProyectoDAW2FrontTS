import type { IMarca, INota, INotaBackend, IPerfume, IPerfumeBackend, TGenero } from "../../../interfaces/IPerfume";
import { IPerfumista, IPerfumistaBackend } from "../../../interfaces/IPerfumista";

export const getGeneroImagen = (value: string): string => {
    switch (value.toLowerCase()) {
        case "hombre":
            return "/perfume-info/icons/gender/male-icon.svg";
        case "mujer":
            return "/perfume-info/icons/gender/female-icon.svg";
        case "unisex":
            return "/perfume-info/icons/gender/unisex-icon.svg";
        default:
            return "";
    }
};

const mapNotaTipo = (tipo?: string): INota["tipo"] => {
    if (tipo === "salida" || tipo === "base") return tipo;
    if (tipo === "corazon" || tipo === "corazón") return "corazon";
    return "base";
};

const mapNotas = (notas?: INotaBackend[]): INota[] => {
    if (!notas) return [];

    return notas.map((nota: INotaBackend) => ({
        nombre: nota.nombre,
        foto: nota.foto,
        tipo: mapNotaTipo(nota.tipo),
    }));
};

const mapFamilias = (familias: IPerfumeBackend["familiasOlfativas"]): string[] => {
    if (!Array.isArray(familias)) return [];

    return familias
        .map((familia) => (typeof familia === "string" ? familia : familia?.nombre))
        .filter((familia): familia is string => Boolean(familia));
};

const mapMarca = (marca: IPerfumeBackend["marca"]): IMarca => {
    if (!marca || typeof marca === "string") {
        return {
            nombre: typeof marca === "string" ? marca : "Desconocida",
            foto: "/default-marca.png"
        };
    }

    return {
        nombre: marca.nombre,
        foto: marca.foto ?? ""
    };
};

const mapPerfumista = (perfumista: IPerfumistaBackend): IPerfumista => {
    return {
        id: perfumista.id ?? "",
        nombre: perfumista.nombre,
        descripcion: perfumista.descripcion ?? "",
        imagen: { src: perfumista.foto ?? "/user/profile-pic/default-profile.jpg", alt: perfumista.nombre }
    }
}

export const mapPerfumeFromBackend = (perfume: IPerfumeBackend): IPerfume => ({
    id: perfume.id ?? "",
    nombre: perfume.nombre,
    coleccion: perfume.coleccion ?? "",
    descripcion: perfume.descripcion ?? "",
    genero: perfume.genero as TGenero,
    fechaLanzamiento: perfume.fechaLanzamiento ?? "",

    perfumistas: perfume.perfumistas?.map(mapPerfumista) ?? [],
    familiasOlfativas: mapFamilias(perfume.familiasOlfativas),

    imagen: {
        src: perfume.foto,
        alt: perfume.nombre
    },

    marca: mapMarca(perfume.marca),

    logo: {
        src: mapMarca(perfume.marca).foto,
        alt: mapMarca(perfume.marca).nombre
    },

    notas: mapNotas(perfume.notas),
});
