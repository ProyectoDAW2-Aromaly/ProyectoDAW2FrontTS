import { getToken } from "./usuarios.services";
import type { IListaPerfil } from "../views/perfil/IProfile";

const API = `${import.meta.env.VITE_APP_API}/listas`;

export interface IListaPerfumeOption {
  id: number;
  nombre: string;
  esPublica: boolean;
  totalPerfumes: number;
  contienePerfume: boolean;
}

interface ICreateListPayload {
  nombre: string;
  esPublica: boolean;
}

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const createMyList = async (payload: ICreateListPayload): Promise<IListaPerfil> => {
  const response = await fetch(API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo crear la lista");
  }

  return data.result.lista;
};

const getMyLists = async (): Promise<IListaPerfil[]> => {
  const response = await fetch(`${API}/mias`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudieron obtener las listas");
  }

  return data.result.listas || [];
};

const getMyListsForPerfume = async (idPerfume: number): Promise<IListaPerfumeOption[]> => {
  const response = await fetch(`${API}/perfume/${idPerfume}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudieron obtener las listas del perfume");
  }

  return data.result.listas || [];
};

const addPerfumeToList = async (idLista: number, idPerfume: number) => {
  const response = await fetch(`${API}/${idLista}/perfumes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ idPerfume }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo guardar el perfume en la lista");
  }

  return data.result;
};

const removePerfumeFromList = async (idLista: number, idPerfume: number) => {
  const response = await fetch(`${API}/${idLista}/perfumes/${idPerfume}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo quitar el perfume de la lista");
  }

  return data.result;
};

const updateMyList = async (idLista: number, payload: ICreateListPayload): Promise<IListaPerfil> => {
  const response = await fetch(`${API}/${idLista}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo editar la lista");
  }

  return data.result.lista;
};

const deleteMyList = async (idLista: number) => {
  const response = await fetch(`${API}/${idLista}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo borrar la lista");
  }

  return data.result;
};


export {
  createMyList,
  getMyLists,
  getMyListsForPerfume,
  addPerfumeToList,
  removePerfumeFromList,
  updateMyList,
  deleteMyList,
};

