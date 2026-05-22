import { ILoginUser, IRegisterUser, IUser } from "../interfaces/IUsuario";
import { getHandler } from "./handler";

const customFetch = getHandler("usuario/");

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
	userName: user.username,
	pfp: user.foto || defaultProfileImage,
	rol: user.rol || "BASICO",
});

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
		const data = await customFetch<IAuthResponse>(
			"registro",
			"Error al registrar el usuario",
			false,
			"POST",
			JSON.stringify(user),
			true
		);

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
		const data = await customFetch<IAuthResponse>(
			"login",
			"Error al iniciar sesion",
			false,
			"POST",
			JSON.stringify(user),
			true
		);

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
