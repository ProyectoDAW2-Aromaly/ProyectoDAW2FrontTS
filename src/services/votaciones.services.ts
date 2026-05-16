import { getToken } from "../services/usuarios.services";

const API = `${import.meta.env.VITE_APP_API}/votaciones`;

const authHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${getToken()}`,
});

export const addFavorite = async (idPerfume: number): Promise<void> => {
	const response = await fetch(`${API}/favorito`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			perfumeId: idPerfume,
			tipo: "favorito",
		}),
	});

	if (!response.ok) {
		throw new Error("No se pudo guardar el perfume como favorito");
	}
};

export const removeFavorite = async (idPerfume: number): Promise<void> => {
	const response = await fetch(`${API}/favorito/${idPerfume}`, {
		method: "DELETE",
		headers: authHeaders(),
	});

	if (!response.ok) {
		throw new Error("No se pudo eliminar el perfume de favoritos");
	}
};

export const isFavorite = async (idPerfume: number): Promise<boolean> => {
	const token = getToken();
	if (!token) return false;

	const response = await fetch(`${API}/favorito/${idPerfume}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		if (response.status === 401 || response.status === 404) return false;
		throw new Error("No se pudo verificar si el perfume es favorito");
	}

	const data = await response.json();
	return Boolean(data.result?.isFavorite ?? data.result?.favorito ?? data.favorito ?? data.isFavorite);
};
