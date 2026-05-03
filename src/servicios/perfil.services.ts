import { getToken, type UserRol } from "./usuarios.services";
import type { IPerfil } from "../views/perfil/IProfile";
import { normalizePerfumeImage } from "../utils/assets";

const API = `${import.meta.env.VITE_APP_API}`;

interface IUpdateProfilePayload {
  email: string;
  descripcion: string;
  foto: string;
}

interface IBackendUser {
  id?: number;
  username: string;
  email?: string;
  descripcion?: string;
  foto?: string;
  rol?: UserRol;
}

interface IBackendPerfumeFavorito {
  id: number;
  nombre?: string;
  foto?: string;
  marca?: string;
  familiasOlfativas?: string[];
}

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const mapUser = (user: IBackendUser) => ({
  id: user.id,
  userName: user.username,
  email: user.email || "",
  descripcion: user.descripcion || "",
  pfp: user.foto || "/user/profile-pic/profile1.jpg",
  rol: user.rol || "BASICO",
});

const mapPerfumeFavorito = (perfume: IBackendPerfumeFavorito) => ({
  id: perfume.id,
  nombre: perfume.nombre || "",
  foto: normalizePerfumeImage(perfume.foto),
  marca: perfume.marca || "",
  familiasOlfativas: perfume.familiasOlfativas || [],
});

const getMyProfile = async (): Promise<IPerfil> => {
  const response = await fetch(`${API}/perfil`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo cargar el perfil");
  }

  return {
    user: mapUser(data.result.user),
    listasCreadas: data.result.listasCreadas || [],
    perfumesFavoritos: (data.result.perfumesFavoritos || []).map(mapPerfumeFavorito),
  };
};

const updateMyProfile = async (payload: IUpdateProfilePayload) => {
  const response = await fetch(`${API}/perfil`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo actualizar el perfil");
  }

  const mappedUser = mapUser(data.result.user);
  localStorage.setItem("user", JSON.stringify({
    userName: mappedUser.userName,
    pfp: mappedUser.pfp,
    rol: mappedUser.rol,
  }));

  return mappedUser;
};

export { getMyProfile, updateMyProfile };
