import type { IPerfume } from "./IPerfume";

// Datos de prueba en local
export const PERFUMES: IPerfume[] = [
    {
        id: "1",
        nombre: "LIRA",
        descripcion: `Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story.
Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.
Lira is based on a perfume originally released by Casamorati in the late 1800s that was created to help a beautiful, aspiring actress realise her dreams.
It was intended to make a lasting impression on all those who encountered it, just like the sweet music of the lyre.`,
        genero: "/perfume-info/icons/genre/female-icon.svg",
        perfumista: [
            {
                id: "perfumerId",
                nombre: "Chris Maurice"
            }
        ],
        coleccion: "",
        yearSalida: "2011",
        imagen: {
            src: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            alt: "Lira Xerjoff"
        },
        logo: {
            src: "/brand/xerjoff-logo.png",
            alt: "Logo de la marca"
        },
        familias: [
            "Oriental",
            "Floral",
            "Gourmand"
        ],
        notas: [
            {
                tipo: "salida",
                nombre: "Naranja roja",
                foto: "/perfume-info/notas/naranja-roja.jpg"
            },
            {
                tipo: "salida",
                nombre: "Lavanda",
                foto: "/perfume-info/notas/lavanda.jpg"
            },
            {
                tipo: "salida",
                nombre: "Bergamota",
                foto: "/perfume-info/notas/bergamota.jpg"
            },
            {
                tipo: "corazon",
                nombre: "Canela",
                foto: "/perfume-info/notas/canela.jpg"
            },
            {
                tipo: "corazon",
                nombre: "Jazmín",
                foto: "/perfume-info/notas/jazmin.jpg"
            },
            {
                tipo: "corazon",
                nombre: "Rosa",
                foto: "/perfume-info/notas/rosa.jpg"
            },
            {
                tipo: "base",
                nombre: "Caramelo",
                foto: "/perfume-info/notas/caramelo.jpg"
            },
            {
                tipo: "base",
                nombre: "Almizcle",
                foto: "/perfume-info/notas/almizcle.jpg"
            },
            {
                tipo: "base",
                nombre: "Vainilla",
                foto: "/perfume-info/notas/vainilla.jpeg"
            }
        ]

    },
    {
        id: "2",
        nombre: "BORN IN ROMA INTENSE DONNA",
        descripcion: `Born In Roma Intense, un espectacular tributo a Roma y sus atardeceres, pretende ensalzar su magnífica personalidad 
celebrando una noche en la Ciudad Eterna. El aroma de esta fragancia Born In Roma aumenta su carácter adictivo 
con una potente vainilla, que se realza con un trío de jazmín luminoso y benjuí cálido, que aporta un toque seductor a las noches 
de las "Aristo punks". Esta fragancia de alta costura cautivadora y magnética está diseñada para quienes viven intensa y apasionadamente 
con un toque de extravagancia. Born In Roma Intense permite a la mujer moderna mostrar su personalidad con intensidad y vivir la vida 
con abundancia y dualidad. Este dúo emblemático desafía alegremente la rivalidad entre el día y la noche, la tradición y la intensidad, 
una misma y los demás.`,
        genero: "/perfume-info/icons/genre/female-icon.svg",
        perfumista: [
            {
                id: "perfumerId",
                nombre: "Amandine Clerc-Marie"
            },
            {
                id: "perfumerId",
                nombre: "Honorine Blanc"
            }
        ],
        coleccion: "Born in Roma",
        yearSalida: "2023",
        imagen: {
            src: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            alt: "Valentino Born in Roma Intense Donna"
        },
        logo: {
            src: "/brand/valentino-logo.png",
            alt: "Logo de la marca"
        },
        familias: [
            "Oriental",
            "Floral"
        ],
        notas: [
            {
                tipo: "salida",
                nombre: "Vainilla Bourbon",
                foto: "/perfume-info/notas/vainilla.jpeg"
            },
            {
                tipo: "salida",
                nombre: "Ámbar",
                foto: "/perfume-info/notas/ambar.jpg"
            },
            {
                tipo: "corazon",
                nombre: "Jazmín",
                foto: "/perfume-info/notas/jazmin.jpg"
            },
            {
                tipo: "base",
                nombre: "Benjuí",
                foto: "/perfume-info/notas/benjui.jpg"
            }
        ]

    },
    {
        id: "3",
        nombre: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        descripcion: `Es una combinación perfecta, o quizás infernal. Este tratamiento único, con un rendimiento muy bajo, ofrece la nota de jara más potente, combinando los beneficios del aceite esencial y el absoluto.
Atacar al sol, expulsarlo del universo, crear oscuridad perpetua: ¡qué propuesta tan descabellada! Pero Donatien Alphonse François, marqués de Sade, era un hombre descabellado.`,
        genero: "/perfume-info/icons/genre/unisex-icon.svg",
        perfumista: [
            {
                id: "perfumerId",
                nombre: "Quentin Bisch"
            }
        ],
        coleccion: "",
        yearSalida: "2016",
        imagen: {
            src: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            alt: "Eldo perfume"
        },
        logo: {
            src: "/brand/ELDO-logo.png",
            alt: "Logo de la marca"
        },
        familias: [
            "Amaderado",
            "Floral"
        ],
        notas: [
            {
                tipo: "salida",
                nombre: "Ládano",
                foto: "/perfume-info/notas/ladano.jpg"
            },
            {
                tipo: "corazon",
                nombre: "Ládano",
                foto: "/perfume-info/notas/ladano.jpg"
            },
            {
                tipo: "base",
                nombre: "Ládano",
                foto: "/perfume-info/notas/ladano.jpg"
            }
        ]

    }
]