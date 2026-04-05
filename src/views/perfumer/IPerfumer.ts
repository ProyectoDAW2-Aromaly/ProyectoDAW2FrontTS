export interface IPerfumer {
    id: string;
    name: string;
    description?: string[];
    image?: {
        src: string,
        alt: string
    }
}