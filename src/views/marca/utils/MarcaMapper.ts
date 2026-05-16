import { IMarca, IMarcaBackend } from "../../../interfaces/IMarca";

export const mapMarcaBackend = (m: IMarcaBackend): IMarca => ({
    nombre: m.nombre ?? "Sin nombre",
    isdarklogo: m.isdarklogo ?? false,
    foto: m.foto ?? "/default.jpg"
});