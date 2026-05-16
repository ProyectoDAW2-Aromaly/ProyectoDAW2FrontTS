import { getToken } from "./usuarios.services";
import type { IListaPerfil } from "../interfaces/IPerfil";
import type { IBackendListDetail, IBackendPublicList, ICreateListPayload, IListaDetalle, IListaPerfumeOption, IListas } from "../interfaces/IListas";
import { normalizePerfumeImage, normalizeUserImage } from "../utils/assets";
import { getHandler } from "./handler";

const customFetch = getHandler("listas")
const API = `${import.meta.env.VITE_SERVER_URL}listas`;

const authHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${getToken()}`,
});

const createMyList = async (payload: ICreateListPayload): Promise<IListaPerfil> => {
	return await customFetch("", "No se pudo crear la lista", true, "POST", JSON.stringify(payload))
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

const mapPublicList = (lista: IBackendPublicList): IListas => ({
	id: String(lista.id),
	nombreUsuario: lista.creadorUsername || "Usuario",
	premium: lista.creadorRol === "PREMIUM",
	cafe: false,
	pfp: normalizeUserImage(lista.creadorFoto),
	titulo: lista.nombre,
	perfumes: (lista.perfumeFotos || []).map((foto: string) => normalizePerfumeImage(foto)),
});

const getPublicLists = async (): Promise<IListas[]> => {
	const response = await fetch(`${API}/publicas`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.mensaje || "No se pudieron obtener las listas públicas");
	}

	return (data.result.listas || []).map(mapPublicList);
};

const getListDetail = async (idLista: number): Promise<IListaDetalle> => {
	const token = getToken();
	const response = await fetch(`${API}/${idLista}`, {
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.mensaje || "No se pudo cargar la lista");
	}

	const lista = data.result.lista as IBackendListDetail;

	return {
		id: lista.id,
		nombre: lista.nombre,
		esPublica: lista.esPublica,
		totalPerfumes: lista.totalPerfumes,
		creadorUsername: lista.creadorUsername,
		creadorFoto: lista.creadorFoto,
		creadorRol: lista.creadorRol,
		perfumes: (lista.perfumes || []).map((perfume) => ({
			id: String(perfume.id),
			nombre: perfume.nombre,
			marca: perfume.marca || "Marca desconocida",
			foto: normalizePerfumeImage(perfume.foto),
			familiasOlfativas: perfume.familiasOlfativas || [],
		})),
	};
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
	getPublicLists,
	getListDetail,
	getMyListsForPerfume,
	addPerfumeToList,
	removePerfumeFromList,
	updateMyList,
	deleteMyList,
};
