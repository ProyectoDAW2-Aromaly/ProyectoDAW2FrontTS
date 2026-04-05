import type { IPerfumer } from "./IPerfumer";

export const PERFUMERS: IPerfumer[] = [
    {
        id: "1",
        name: "Chris Maurice",
        description: ["Descripción del primer perfumista llamado Chris Maurice"],
        image: {
            src: "/perfumer/Chris-Maurice.jpg",
            alt: "Chris Maurice"
        }
    },
    {
        id: "2",
        name: "Amandine Clerc-Marie",
        description: ["Descripción de la segunda perfumista llamada Amandine Clerc-Marie"],
        image: {
            src: "/perfumer/Amandine-Clerc-Marie.jpg",
            alt: "Amandine Clerc-Marie"
        } 
    },
    {
        id: "3",
        name: "Honorine Blanc",
        description: ["Descripción de la tercera perfumista llamada Honorine Blanc"],
        image: {
            src: "/perfumer/Honorine-Blanc.jpg",
            alt: "Honorine Blanc"
        }
    },
    {
        id: "4",
        name: "Quentin Bisch",
        description: ["Descripción del cuarto perfumista llamado Quentin Bisch"],
        image: {
            src: "/perfumer/Quentin-Bisch.jpg",
            alt: "Quentin Bisch"
        }
    }
]