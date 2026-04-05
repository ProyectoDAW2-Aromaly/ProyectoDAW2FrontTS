import type { IPerfume } from "./IPerfume";

// Datos de prueba en local
export const PERFUMES: IPerfume[] = [
    {
        id: "1",
        name: "LIRA",
        description: [
            `Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story.
                            Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.`,
            `Lira is based on a perfume originally released by Casamorati in the late 1800s that was created to help a beautiful, aspiring actress realise her dreams.
                            It was intended to make a lasting impression on all those who encountered it, just like the sweet music of the lyre.`
        ],
        genderIcon: "/perfume-info/icons/genre/female-icon.svg",
        perfumer: [
            {
                id: "perfumerId",
                name: "Chris Maurice"
            }
        ],
        colection: "",
        releaseDate: "2011",
        image: {
            src: "/perfume-info/perfume/lira/xerjoff-lira.jpg",
            alt: "Lira Xerjoff"
        },
        logo: {
            src: "/perfume-info/perfume/lira/xerjoff-logo.png",
            alt: "Logo de la marca"
        },
        families: [
            "Oriental",
            "Floral",
            "Gourmand"
        ],
        pyramids: [
            {
                category: "Notas de salida",
                notes: [
                    {
                        name: "Naranja roja",
                        imageSrc: "/perfume-info/notas/naranja-roja.jpg"
                    },
                    {
                        name: "Lavanda",
                        imageSrc: "/perfume-info/notas/lavanda.jpg"
                    },
                    {
                        name: "Bergamota",
                        imageSrc: "/perfume-info/notas/bergamota.jpg"
                    }
                ]
            },
            {
                category: "Notas de corazón",
                notes: [
                    {
                        name: "Canela",
                        imageSrc: "/perfume-info/notas/canela.jpg"
                    },
                    {
                        name: "Jazmín",
                        imageSrc: "/perfume-info/notas/jazmin.jpg"
                    },
                    {
                        name: "Rosa",
                        imageSrc: "/perfume-info/notas/rosa.jpg"
                    }
                ]
            },
            {
                category: "Notas base",
                notes: [
                    {
                        name: "Caramelo",
                        imageSrc: "/perfume-info/notas/caramelo.jpg"
                    },
                    {
                        name: "Almizcle",
                        imageSrc: "/perfume-info/notas/almizcle.jpg"
                    },
                    {
                        name: "Vainilla",
                        imageSrc: "/perfume-info/notas/vainilla.jpeg"
                    },
                    {
                        name: "Prueba"
                    },
                    {
                        name: "Prueba"
                    }
                ]
            }
        ]

    },
    {
        id: "2",
        name: "BORN IN ROMA INTENSE DONNA",
        description: [
            `Born In Roma Intense, un espectacular tributo a Roma y sus atardeceres, pretende ensalzar su magnífica personalidad 
            celebrando una noche en la Ciudad Eterna. El aroma de esta fragancia Born In Roma aumenta su carácter adictivo 
            con una potente vainilla, que se realza con un trío de jazmín luminoso y benjuí cálido, que aporta un toque seductor a las noches 
            de las "Aristo punks". Esta fragancia de alta costura cautivadora y magnética está diseñada para quienes viven intensa y apasionadamente 
            con un toque de extravagancia. Born In Roma Intense permite a la mujer moderna mostrar su personalidad con intensidad y vivir la vida 
            con abundancia y dualidad. Este dúo emblemático desafía alegremente la rivalidad entre el día y la noche, la tradición y la intensidad, 
            una misma y los demás.`
        ],
        genderIcon: "/perfume-info/icons/genre/female-icon.svg",
        perfumer: [
            {
                id: "perfumerId",
                name: "Amandine Clerc-Marie"
            },
            {
                id: "perfumerId",
                name: "Honorine Blanc"
            }
        ],
        colection: "Born in Roma",
        releaseDate: "2023",
        image: {
            src: "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
            alt: "Valentino Born in Roma Intense Donna"
        },
        logo: {
            src: "/perfume-info/perfume/born-in-roma/valentino-logo.png",
            alt: "Logo de la marca"
        },
        families: [
            "Oriental",
            "Floral"
        ],
        pyramids: [
            {
                category: "Notas de salida",
                notes: [
                    {
                        name: "Vainilla Bourbon",
                        imageSrc: "/perfume-info/notas/vainilla.jpeg"
                    },
                    {
                        name: "Ámbar",
                        imageSrc: "/perfume-info/notas/ambar.jpg"
                    }
                ]
            },
            {
                category: "Notas de corazón",
                notes: [
                    {
                        name: "Jazmín",
                        imageSrc: "/perfume-info/notas/jazmin.jpg"
                    }
                ]
            },
            {
                category: "Notas base",
                notes: [
                    {
                        name: "Benjuí",
                        imageSrc: "/perfume-info/notas/benjui.jpg"
                    }
                ]
            }
        ]

    },
    {
        id: "3",
        name: "ATTAQUER LE SOLEIL - MARQUIS DE SADE",
        description: [
            `Es una combinación perfecta, o quizás infernal. Este tratamiento único, con un rendimiento muy bajo, ofrece la nota de jara más potente, combinando los beneficios del aceite esencial y el absoluto.`,
            `Atacar al sol, expulsarlo del universo, crear oscuridad perpetua: ¡qué propuesta tan descabellada! Pero Donatien Alphonse François, marqués de Sade, era un hombre descabellado.`
        ],
        genderIcon: "/perfume-info/icons/genre/unisex-icon.svg",
        perfumer: [
            {
                id: "perfumerId",
                name: "Quentin Bisch"
            }
        ],
        colection: "",
        releaseDate: "2016",
        image: {
            src: "/perfume-info/perfume/ELDO/eldo-perfume.webp",
            alt: "Eldo perfume"
        },
        logo: {
            src: "/perfume-info/perfume/ELDO/ELDO-logo.png",
            alt: "Logo de la marca"
        },
        families: [
            "Amaderado",
            "Floral"
        ],
        pyramids: [
            {
                category: "Notas de salida",
                notes: [
                    {
                        name: "Ládano",
                        imageSrc: "/perfume-info/notas/ladano.jpg"
                    }
                ]
            },
            {
                category: "Notas de corazón",
                notes: [
                    {
                        name: "Ládano",
                        imageSrc: "/perfume-info/notas/ladano.jpg"
                    }
                ]
            },
            {
                category: "Notas base",
                notes: [
                    {
                        name: "Ládano",
                        imageSrc: "/perfume-info/notas/ladano.jpg"
                    }
                ]
            }
        ]

    }
]