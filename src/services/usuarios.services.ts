import { ILoginUser, IRegisterUser, IUser } from "../interfaces/IUsuario";
import { getHandler } from "./handler";

const customFetch = getHandler("usuario/");
const URL_SERVER = `${import.meta.env.VITE_SERVER_URL}`;

export type UserRol = "ADMIN" | "BASICO" | "PREMIUM";

interface IBackendUser {
	id: number;
	username: string;
	foto?: string;
	rol?: UserRol;
}

interface IAuthResponse {
	result: {
		user: IBackendUser;
		token?: string;
	};
}

const defaultProfileImage = "/user/profile-pic/default-profile.jpg";

const mapUser = (user: IBackendUser): IUser => ({
	id: user.id,
	username: user.username,
	pfp: user.foto || defaultProfileImage,
	rol: user.rol || "BASICO",
});

const postAuth = async (endpoint: "registro" | "login", body: ILoginUser | IRegisterUser) => {
	const res = await fetch(URL_SERVER + "usuario/" + endpoint, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.mensaje || "No se ha podido completar la operación.");
	}

	return data as IAuthResponse;
};

export function getUsuarioPorId(id_usuario: number) {
	return customFetch<IBackendUser>(`${id_usuario}`, "Error al obtener el usuario.")
		.then(mapUser);
}

const getUser = (): IUser | null => {
	const user = localStorage.getItem("user");
	const token = localStorage.getItem("token");

	if (user && token) {
		try {
			return JSON.parse(user);
		} catch {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			return null;
		}
	}

	return null;
};

const saveUser = async (user: IRegisterUser) => {
	try {
		const data = await postAuth("registro", user);

		return { ...data, status: 201 };
	} catch (err) {
		return {
			status: 400,
			mensaje: err instanceof Error ? err.message : "Error al registrar el usuario",
		};
	}
};

const doLogin = async (user: ILoginUser) => {
	try {
		const data = await postAuth("login", user);

		const mappedUser = mapUser(data.result.user);

		localStorage.setItem("user", JSON.stringify(mappedUser));
		if (data.result.token) {
			localStorage.setItem("token", data.result.token);
		}

		return { ...data, status: 200 };
	} catch (err) {
		return {
			status: 401,
			mensaje: err instanceof Error ? err.message : "Error al iniciar sesion",
		};
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
