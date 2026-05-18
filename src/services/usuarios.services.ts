import { ILoginUser, IRegisterUser, IUser } from "../interfaces/IUsuario";
import { normalizeUserImage } from "../utils/assets";

const API = `${import.meta.env.VITE_SERVER_URL}usuario/`;

import { getHandler } from "./handler";

const customFetch = getHandler("usuario/");

export type UserRol = "ADMIN" | "BASICO" | "PREMIUM";

export function getUsuarioPorId(id_usuario: number) {
	return customFetch<IUser>(`${id_usuario}`, "Error al obtener el usuario.");
}

const getUser = (): IUser | null => {
	const user = localStorage.getItem("user");
	const token = localStorage.getItem("token");

	// Solo devolver usuario si hay ambos: datos Y token
	if (user && token) {
		try {
			return JSON.parse(user);
		} catch {
			// Si hay error al parsear, limpiar solo los datos corruptos
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			return null;
		}
	}

	// Si no hay ambos datos, devolver null (sin limpiar, podrían ser datos legítimos)
	return null;
};

const saveUser = async (user: IRegisterUser) => {
	const url = `${API}registro`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const data = await response.json();
		data.status = response.status;
		return data;
	} catch (err) {
		return err;
	}
};

const doLogin = async (user: ILoginUser) => {
	const url = `${API}login`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const data = await response.json();
		data.status = response.status;

		if (data.status === 200) {
			const mappedUser: IUser = {
				id: data.result.user.id,
				userName: data.result.user.username,
				pfp: normalizeUserImage(data.result.user.foto),
				rol: data.result.user.rol || "BASICO",
			};

			localStorage.setItem("user", JSON.stringify(mappedUser));
			localStorage.setItem("token", data.result.token);
		}

		return data;
	} catch (err) {
		return err;
	}
};

const getToken = () => {
	return localStorage.getItem("token");
};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
};

export { getUser, saveUser, doLogin, getToken, logout };
