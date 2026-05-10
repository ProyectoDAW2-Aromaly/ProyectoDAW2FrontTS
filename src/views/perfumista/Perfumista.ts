import type { IPerfumista } from "./IPerfumista";

export const PERFUMERS: IPerfumista[] = [
    {
        id: "1",
        nombre: "Chris Maurice",
        descripcion: ["Descripción del primer perfumista llamado Chris Maurice"],
        imagen: {
            src: "/perfumer/Chris-Maurice.jpg",
            alt: "Chris Maurice"
        }
    },
    {
        id: "2",
        nombre: "Amandine Clerc-Marie",
        descripcion: ["Descripción de la segunda perfumista llamada Amandine Clerc-Marie"],
        imagen: {
            src: "/perfumer/Amandine-Clerc-Marie.jpg",
            alt: "Amandine Clerc-Marie"
        } 
    },
    {
        id: "3",
        nombre: "Honorine Blanc",
        descripcion: ["Descripción de la tercera perfumista llamada Honorine Blanc"],
        imagen: {
            src: "/perfumer/Honorine-Blanc.jpg",
            alt: "Honorine Blanc"
        }
    },
    {
        id: "4",
        nombre: "Quentin Bisch",
        descripcion: ["Descripción del cuarto perfumista llamado Quentin Bisch"],
        imagen: {
            src: "/perfumer/Quentin-Bisch.jpg",
            alt: "Quentin Bisch"
        }
    }
]