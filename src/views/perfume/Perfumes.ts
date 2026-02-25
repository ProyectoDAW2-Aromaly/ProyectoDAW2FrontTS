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
        perfumer: {
            id: "perfumerId",
            name: "Chris Maurice"
        },
        releaseDate: "2011",
        image: {
            src: "/perfume-info/xerjoff-lira.jpg",
            alt: "Lira Xerjoff"
        },
        logo: {
            src: "/perfume-info/xerjoff-logo.png",
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
        name: "LIRAN",
        description: [
            `Lira is a perfume whose every aspect enchants, from its deliciously tempting scent to its poetic origin story.
                            Its name derives from the Italian word for lyre, the ancient musical instrument which holds great significance in mythology.`,
            `Lira is based on a perfume originally released by Casamorati in the late 1800s that was created to help a beautiful, aspiring actress realise her dreams.
                            It was intended to make a lasting impression on all those who encountered it, just like the sweet music of the lyre.`
        ],
        genderIcon: "/perfume-info/icons/genre/female-icon.svg",
        perfumer: {
            id: "perfumerId",
            name: "Chris Maurice"
        },
        releaseDate: "2011",
        image: {
            src: "/perfume-info/xerjoff-lira.jpg",
            alt: "Lira Xerjoff"
        },
        logo: {
            src: "/perfume-info/xerjoff-logo.png",
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

    }
]