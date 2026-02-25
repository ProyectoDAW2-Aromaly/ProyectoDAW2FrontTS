// Modelo que utiliza la página para organizar sus datos
interface INote {
    name: string,
    imageSrc?: string
}

// Interfaz para representar perfume por ahora
export interface IPerfume {
    id: string,
    name: string,
    description: string[],
    genderIcon: string,
    perfumer: {
        id: string,
        name: string
    },
    releaseDate: string,
    image: {
        src: string,
        alt: string
    },
    logo: {
        src: string,
        alt: string
    },
    families: string[],
    pyramids: {
        category: string,
        notes: INote[]
    }[]
}