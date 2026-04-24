import type { IUser } from "../../../App";
import type { ICardPerfume } from "../../../components/PerfumeCard";

// eslint-disable-next-line react-refresh/only-export-components
export const USUARIOS_LISTAS = ["Lista 1", "Lista 2", "Lista 3", "Lista 4", "Lista 5"];

export const EPOCA = [
    { key: "autumn", name: "Otono", icon: "/perfume-info/icons/season/autumn-icon.svg" },
    { key: "invierno", name: "Invierno", icon: "/perfume-info/icons/season/winter-icon.svg" },
    { key: "primavera", name: "Primavera", icon: "/perfume-info/icons/season/spring-icon.svg" },
    { key: "verano", name: "Verano", icon: "/perfume-info/icons/season/summer-icon.svg" },
] as const;

// eslint-disable-next-line react-refresh/only-export-components
export const LABELS_DURACION = ["Escasa (0-2h)", "Poca (3-6h)", "Buena (5-12h)", "Excelente (+12h)"];
// eslint-disable-next-line react-refresh/only-export-components
export const LABELS_PRECIO = ["Economico", "Moderado", "Caro", "Muy caro"];

// eslint-disable-next-line react-refresh/only-export-components
export const MOCKED_PERFUMES: ICardPerfume[] = [
    {
        id: "ValentinoID",
        nombre: "Born in Roma Intense Donna",
        marca: "Valentino",
        foto: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
        familiasOlfativas: ["Oriental", "floral", "Gourmand"],
    },
    {
        id: "EldoID",
        nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        marca: "Etat Libre D'Orange",
        foto: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
        familiasOlfativas: ["Amaderado", "floral"],
    },
    {
        id: "LiraId",
        nombre: "Lira",
        marca: "Xerjoff",
        foto: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
        familiasOlfativas: ["Oriental", "floral", "Gourmand"],
    },
];

// eslint-disable-next-line react-refresh/only-export-components
export const TEMP_USER: IUser = {
    userName: "Jakob",
    pfp: "/user/profile-pic/profile2.jpg",
    rol: "admin",
};
