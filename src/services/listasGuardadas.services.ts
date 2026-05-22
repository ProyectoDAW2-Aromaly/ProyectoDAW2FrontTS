import { getHandler } from "./handler";

const customFetch = getHandler("listas");

type ListActionResponse = {
	result: {
		ok: boolean;
	};
};

type SavedStateResponse = {
	result: {
		guardada: boolean;
	};
};

export function guardarLista(idLista: number) {
	return customFetch<ListActionResponse>(
		`/guardar/${idLista}`,
		"No se pudo guardar la lista",
		true,
		"POST"
	);
}

export function quitarListaGuardada(idLista: number) {
	return customFetch<ListActionResponse>(
		`/guardar/${idLista}`,
		"No se pudo quitar la lista guardada",
		true,
		"DELETE"
	);
}

export function getListasGuardadas() {
	return customFetch("/guardadas", "No se pudieron obtener las listas guardadas", true);
}

export function estaListaGuardada(idLista: number) {
	return customFetch<SavedStateResponse>(
		`/guardada/${idLista}`,
		"No se pudo verificar la lista guardada",
		true
	);
}
