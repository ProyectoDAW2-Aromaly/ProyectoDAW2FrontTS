import type { IListaPerfil } from "../interfaces/IPerfil";
import type {
	IBackendListDetail,
	IBackendPublicList,
	ICreateListPayload,
	IListaDetalle,
	IListaPerfumeOption,
	IListas,
} from "../interfaces/IListas";
import { getHandler } from "./handler";

const customFetch = getHandler("listas");

type ListResponse<T> = {
	result: T;
};

type ListsResponse<T> = ListResponse<{
	listas: T[];
}>;

type SingleListResponse<T> = ListResponse<{
	lista: T;
}>;

const mapPublicList = (lista: IBackendPublicList): IListas => ({
	id: String(lista.id),
	nombreUsuario: lista.creadorUsername || "Usuario",
	premium: lista.creadorRol === "PREMIUM",
	cafe: false,
	pfp: lista.creadorFoto ?? "/user/profile-pic/default-profile.jpg",
	titulo: lista.nombre,
	perfumes: lista.perfumeFotos || [],
	rol: lista.creadorRol
});

const mapListDetail = (lista: IBackendListDetail): IListaDetalle => ({
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
		descripcion: "",
		genero: "",
		marca: {
			nombre: perfume.marca || "Marca desconocida",
			isdarklogo: true,
			foto: "",
		},
		foto: perfume.foto || "",
		familiasOlfativas: (perfume.familiasOlfativas || []).map((nombre) => ({ nombre })),
	})),
});

export function createMyList(payload: ICreateListPayload): Promise<IListaPerfil> {
	return customFetch<SingleListResponse<IListaPerfil>>(
		"",
		"No se pudo crear la lista",
		true,
		"POST",
		JSON.stringify(payload),
		true
	).then((data) => data.result.lista);
}

export function getMyLists(): Promise<IListaPerfil[]> {
	return customFetch<ListsResponse<IListaPerfil>>("/mias", "No se pudieron obtener las listas", true)
		.then((data) => data.result.listas || []);
}

export function getMyListsForPerfume(idPerfume: number): Promise<IListaPerfumeOption[]> {
	return customFetch<ListsResponse<IListaPerfumeOption>>(
		`/perfume/${idPerfume}`,
		"No se pudieron obtener las listas del perfume",
		true
	).then((data) => data.result.listas || []);
}

export function getPublicLists(): Promise<IListas[]> {
	return customFetch<ListsResponse<IBackendPublicList>>("/publicas", "No se pudieron obtener las listas publicas")
		.then((data) => (data.result.listas ?? []).map(mapPublicList));
}

export function getListDetail(idLista: number): Promise<IListaDetalle> {
	return customFetch<SingleListResponse<IBackendListDetail>>(`/${idLista}`, "No se pudo cargar la lista")
		.then((data) => mapListDetail(data.result.lista));
}

export function addPerfumeToList(idLista: number, idPerfume: number) {
	return customFetch<ListResponse<{ ok: boolean }>>(
		`/${idLista}/perfumes`,
		"No se pudo guardar el perfume en la lista",
		true,
		"POST",
		JSON.stringify({ idPerfume }),
		true
	).then((data) => data.result);
}

export function removePerfumeFromList(idLista: number, idPerfume: number) {
	return customFetch<ListResponse<{ ok: boolean }>>(
		`/${idLista}/perfumes/${idPerfume}`,
		"No se pudo quitar el perfume de la lista",
		true,
		"DELETE"
	).then((data) => data.result);
}

export function updateMyList(idLista: number, payload: ICreateListPayload): Promise<IListaPerfil> {
	return customFetch<SingleListResponse<IListaPerfil>>(
		`/${idLista}`,
		"No se pudo editar la lista",
		true,
		"PATCH",
		JSON.stringify(payload),
		true
	).then((data) => data.result.lista);
}

export function deleteMyList(idLista: number) {
	return customFetch<ListResponse<{ ok: boolean }>>(
		`/${idLista}`,
		"No se pudo borrar la lista",
		true,
		"DELETE"
	).then((data) => data.result);
}
