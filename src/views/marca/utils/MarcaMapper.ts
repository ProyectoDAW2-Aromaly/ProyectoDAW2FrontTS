import { IMarca, IMarcaBackend } from "../IMarca";

export const mapMarcaBackend = (m: IMarcaBackend): IMarca => ({
    nombre: m.nombre ?? "Sin nombre",
    isdarklogo: m.isdarklogo ?? false,
    foto: m.foto ?? "/default.jpg"
});