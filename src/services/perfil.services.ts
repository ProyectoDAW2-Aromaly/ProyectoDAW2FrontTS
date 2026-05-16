import { getToken } from "./usuarios.services";
import type { IBackendPerfumeFavorito, IBackendUser, IPerfil, IUpdateProfilePayload } from "../interfaces/IPerfil";
import { normalizePerfumeImage, normalizeUserImage } from "../utils/assets";

const API = `${import.meta.env.VITE_SERVER_URL}`;

const authHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
  }
  const cleanedToken = token.trim();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cleanedToken}`,
  };
};

const authMultipartHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
  }
  const cleanedToken = token.trim();
  console.log("authMultipartHeaders - Authorization:", `Bearer ${cleanedToken}`);
  return {
    Authorization: `Bearer ${cleanedToken}`,
  };
};

const mapUser = (user: IBackendUser) => ({
  id: user.id,
  userName: user.username,
  email: user.email || "",
  descripcion: user.descripcion || "",
  pfp: normalizeUserImage(user.foto),
  rol: user.rol || "BASICO",
});

const mapPerfumeFavorito = (perfume: IBackendPerfumeFavorito) => ({
  id: perfume.id,
  nombre: perfume.nombre || "",
  foto: normalizePerfumeImage(perfume.foto),
  marca: perfume.marca || "",
  familiasOlfativas: perfume.familiasOlfativas || [],
});

const mapListaPerfil = (lista: any) => ({
  ...lista,
  perfumeFotos: (lista.perfumeFotos || []).map((foto: string) => normalizePerfumeImage(foto)),
});

const mapListaGuardada = (lista: any) => ({
  ...lista,
  creadorFoto: normalizeUserImage(lista.creadorFoto),
  perfumeFotos: (lista.perfumeFotos || []).map((foto: string) => normalizePerfumeImage(foto)),
});

const getMyProfile = async (): Promise<IPerfil> => {

  
  const response = await fetch(`${API}perfil`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await response.json();
  console.log("GET Profile - Response status:", response.status);

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo cargar el perfil");
  }

  return {
    user: mapUser(data.result.user),
    listasCreadas: (data.result.listasCreadas || []).map(mapListaPerfil),
    listasGuardadas: (data.result.listasGuardadas || []).map(mapListaGuardada),
    perfumesFavoritos: (data.result.perfumesFavoritos || []).map(mapPerfumeFavorito),
  };
};

const updateMyProfile = async (payload: IUpdateProfilePayload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("descripcion", payload.descripcion);
  formData.append("foto", payload.foto || "");

  if (payload.archivo) {
    formData.append("foto", payload.archivo);
  }

  const token = getToken();
  console.log("Token being sent:", token ? `${token.substring(0, 20)}...` : "null");
  
  const response = await fetch(`${API}perfil`, {
    method: "PATCH",
    headers: authMultipartHeaders(),
    body: formData,
  });

  const data = await response.json();
  console.log("Backend response:", data);
  console.log("Response status:", response.status);

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
